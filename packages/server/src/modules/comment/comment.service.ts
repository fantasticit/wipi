import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SMTPService } from '../smtp/smtp.service';
import { ArticleService } from '../article/article.service';
import { SettingService } from '../setting/setting.service';
import { UserService } from '../user/user.service';
import { marked } from '../article/markdown.util';
import { Comment } from './comment.entity';

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
      const { smtpFromUser: from, systemUrl, systemTitle } = await this.settingService.findAll(
        true
      );

      const sendEmail = (adminName, adminEmail) => {
        const emailMessage = {
          from,
          to: adminEmail,
          subject: '新评论通知',
          html: `
<div>
<table cellpadding="0" align="center" style="width: 600px; margin: 0px auto; text-align: left; position: relative; font-size: 14px; font-family:微软雅黑, 黑体; line-height: 1.5; box-shadow: rgb(153, 153, 153) 0px 0px 5px; border-collapse: collapse; background-position: initial initial; background-repeat: initial initial;background:#fff;">
    <tbody>
    <tr>
        <th valign="middle"
            style="height: 25px; line-height: 25px; padding: 15px 35px; background-color: #ff0064; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px;">
            <font face="微软雅黑" size="5" style="color: rgb(255, 255, 255);">新评论通知</font>
        </th>
    </tr>
    <tr>
        <td>
            <div style="padding:25px 35px 40px; background-color:#fff;">
                <h2 style="margin: 5px 0px; ">
                  <font color="#333333" style="line-height: 20px; ">
                    <font style="line-height: 22px; " size="4">
                      亲爱的 ${adminName}
                    </font>
                  </font>
                </h2>
                <p>站点收到新评论：</p>
                <p>评论人：<b>${comment.name}</b></p>
                <p>评论内容：<b>${comment.content}</b></p>
                <p align="right">${systemTitle}</p>
                <p align="right">${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}</p>
                <div style="width:700px;margin:0 auto;">
                    <div style="padding:10px 10px 0;border-top:1px solid #ccc;color:#747474;margin-bottom:20px;line-height:1.3em;font-size:12px;">
                        <p>此为系统邮件，请勿回复<br>
                            请保管好您的邮箱，避免账号被他人盗用
                        </p>
                    </div>
                </div>
            </div>
        </td>
    </tr>
    </tbody>
</table>
</div>
        `,
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
          const { smtpFromUser: from, systemUrl, systemTitle } = await this.settingService.findAll(
            true
          );
          const emailMessage = {
            from,
            to: replyUserEmail,
            subject: '评论回复通知',
            html: `
<div>
  <table cellpadding="0" align="center"
          style="width: 600px; margin: 0px auto; text-align: left; position: relative; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; font-size: 14px; font-family:微软雅黑, 黑体; line-height: 1.5; box-shadow: rgb(153, 153, 153) 0px 0px 5px; border-collapse: collapse; background-position: initial initial; background-repeat: initial initial;background:#fff;">
      <tbody>
      <tr>
          <th valign="middle"
              style="height: 25px; line-height: 25px; padding: 15px 35px; background-color: #ff0064; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px;">
              <font face="微软雅黑" size="5" style="color: rgb(255, 255, 255); ">评论回复通知</font>
          </th>
      </tr>
      <tr>
          <td>
              <div style="padding:25px 35px 40px; background-color:#fff;">
                  <h2 style="margin: 5px 0px; ">
                    <font color="#333333" style="line-height: 20px; ">
                      <font style="line-height: 22px; " size="4">
                        亲爱的 ${replyUserName}
                      </font>
                    </font>
                  </h2>
                  <p>您的评论已经被他人回复。点击下方按钮前往查看。</p>
                  <p align="center">
                    <a href="${url.resolve(
                      systemUrl,
                      `/${isHostInPage ? 'page' : 'article'}/` + hostId
                    )}" style="display: inline-block; margin: 16px auto; width: 160px; height: 32px; line-height: 32px; color: #ff0064; border: 1px solid #ff0064; background-color: #fff0f6; border-radius: 4px; text-decoration: none;">
                    前往查看
                    </a>
                  </p>
                  <p align="right">${systemTitle}</p>
                  <p align="right">${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}</p>
                  <div style="width:700px;margin:0 auto;">
                      <div style="padding:10px 10px 0;border-top:1px solid #ccc;color:#747474;margin-bottom:20px;line-height:1.3em;font-size:12px;">
                          <p>此为系统邮件，请勿回复<br>
                              请保管好您的邮箱，避免账号被他人盗用
                          </p>
                      </div>
                  </div>
              </div>
          </td>
      </tr>
      </tbody>
  </table>
</div>`,
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
