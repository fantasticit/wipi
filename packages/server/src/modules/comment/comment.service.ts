import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SMTPService } from '../smtp/smtp.service';
import { ArticleService } from '../article/article.service';
import { SettingService } from '../setting/setting.service';
import { UserService } from '../user/user.service';
import { marked } from '../article/markdown.util';
import { Comment } from './comment.entity';
import { getNewCommentHTML, getReplyCommentHTML } from './html';

const url = require('url');
const UAParser = require('ua-parser-js');
const dayjs = require('dayjs');

/**
 * 扁平接口评论转为树形评论
 * @param list
 */
function buildTree(list) {
  const temp = {};
  const tree = [];

  for (const item of list) {
    temp[item.id] = item;
  }

  for (const i in temp) {
    if (temp[i].parentCommentId) {
      if (temp[temp[i].parentCommentId]) {
        if (!temp[temp[i].parentCommentId].children) {
          temp[temp[i].parentCommentId].children = [];
        }
        temp[temp[i].parentCommentId].children.push(temp[i]);
      } else {
        tree.push(temp[i]); // 父级可能被删除或者未通过，直接升级
      }
    } else {
      tree.push(temp[i]);
    }
  }

  return tree;
}

const parseUserAgent = (userAgent) => {
  const uaparser = new UAParser();
  uaparser.setUA(userAgent);
  const uaInfo = uaparser.getResult();
  let msg = `${uaInfo.browser.name || ''} ${uaInfo.browser.version || ''} `;
  msg += ` ${uaInfo.os.name || ''}  ${uaInfo.os.version || ''} `;
  msg += `${uaInfo.device.vendor || ''} ${uaInfo.device.model || ''} ${uaInfo.device.type || ''}`;
  return msg;
};
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly articleService: ArticleService,
    private readonly smtpService: SMTPService,
    private readonly settingService: SettingService,
    private readonly userService: UserService
  ) {}

  /**
   * 创建评论
   * @param comment
   */
  async create(
    userAgent,
    comment: Partial<Comment> & { reply?: string; createByAdmin?: boolean }
  ): Promise<Comment> {
    const { hostId, name, email, content, createByAdmin = false } = comment;

    if (!hostId || !name || !email || !content) {
      throw new HttpException('缺失参数', HttpStatus.BAD_REQUEST);
    }

    comment.pass = false;
    comment.userAgent = parseUserAgent(userAgent);
    comment.html = marked(content).html;
    const newComment = await this.commentRepository.create(comment);
    await this.commentRepository.save(comment);

    if (!createByAdmin) {
      // 发送通知邮件
      const setting = await this.settingService.findAll(true);
      const sendEmail = (adminName, adminEmail) => {
        const emailMessage = {
          from: setting.smtpFromUser,
          to: adminEmail,
          subject: '新评论通知',
          html: getNewCommentHTML({ ...setting, adminName, comment }),
        };
        this.smtpService.create(emailMessage).catch(() => {
          console.log('收到新评论，但发送邮件通知失败');
        });
      };
      try {
        // 通知所有管理员审核评论
        const [users] = await this.userService.findAll({ role: 'admin' });
        users.forEach((user) => {
          if (user.email) {
            sendEmail(user.name, user.email);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }

    return newComment;
  }

  /**
   * 查询所有评论
   * 额外添加文章信息
   */
  async findAll(queryParams: any = {}): Promise<[Comment[], number]> {
    const query = this.commentRepository
      .createQueryBuilder('comment')
      .orderBy('comment.createAt', 'DESC');

    const { page = 1, pageSize = 12, pass, ...otherParams } = queryParams;

    query.skip((+page - 1) * +pageSize);
    query.take(+pageSize);

    if (pass) {
      query.andWhere('comment.pass=:pass').setParameter('pass', pass);
    }

    if (otherParams) {
      Object.keys(otherParams).forEach((key) => {
        query
          .andWhere(`comment.${key} LIKE :${key}`)
          .setParameter(`${key}`, `%${otherParams[key]}%`);
      });
    }

    return query.getManyAndCount();
  }

  /**
   * 获取指定评论
   * @param id
   */
  async findById(id): Promise<Comment> {
    return this.commentRepository.findOne(id);
  }

  /**
   * 获取文章评论
   * @param articleId
   */
  async getArticleComments(hostId, queryParams) {
    const query = this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.hostId=:hostId')
      .andWhere('comment.pass=:pass')
      .andWhere('comment.parentCommentId is NULL')
      .orderBy('comment.createAt', 'DESC')
      .setParameter('hostId', hostId)
      .setParameter('pass', true);

    const subQuery = this.commentRepository
      .createQueryBuilder('comment')
      .andWhere('comment.pass=:pass')
      .andWhere('comment.parentCommentId=:parentCommentId')
      .orderBy('comment.createAt', 'ASC')
      .setParameter('pass', true);

    const { page = 1, pageSize = 12 } = queryParams;
    query.skip((+page - 1) * +pageSize);
    query.take(+pageSize);
    const [data, count] = await query.getManyAndCount();

    for (const item of data) {
      const subComments = await subQuery.setParameter('parentCommentId', item.id).getMany();
      Object.assign(item, { children: subComments });
    }

    return [data, count];
  }

  async findByIds(ids): Promise<Array<Comment>> {
    return this.commentRepository.findByIds(ids);
  }

  /**
   * 更新评论
   * @param id
   * @param tag
   */
  async updateById(id, data: Partial<Comment>): Promise<Comment> {
    const old = await this.commentRepository.findOne(id);
    const newData = await this.commentRepository.merge(old, data);

    if (newData.pass) {
      const { replyUserName, replyUserEmail, hostId, isHostInPage } = newData;
      const isReply = replyUserName && replyUserEmail;
      if (isReply) {
        // 发送通知邮件
        try {
          const setting = await this.settingService.findAll(true);
          const emailMessage = {
            from: setting.smtpFromUser,
            to: replyUserEmail,
            subject: '评论回复通知',
            html: getReplyCommentHTML({
              ...setting,
              replyUserName,
              commentHostUrl: url.resolve(
                setting.systemUrl,
                `/${isHostInPage ? 'page' : 'article'}/` + hostId
              ),
            }),
          };
          this.smtpService.create(emailMessage).catch(() => {
            console.log(`通知用户 ${replyUserName}（${replyUserEmail}），但发送邮件通知失败`);
          });
        } catch (e) {}
      }
    }

    return this.commentRepository.save(newData);
  }

  async deleteById(id) {
    const data = await this.commentRepository.findOne(id);
    return this.commentRepository.remove(data);
  }
}
