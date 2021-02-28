import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { View } from './view.entity';

const ipSearcher = require('node-ip2region').create();
const UAParser = require('ua-parser-js');

const parseUserAgent = (userAgent) => {
  const uaparser = new UAParser();
  uaparser.setUA(userAgent);
  const uaInfo = uaparser.getResult();
  return {
    browser: uaInfo.browser ? `${uaInfo.browser.name} ${uaInfo.browser.version}` : '',
    engine: uaInfo.engine ? `${uaInfo.engine.name} ${uaInfo.engine.version}` : '',
    os: uaInfo.os ? `${uaInfo.os.name} ${uaInfo.os.version}` : '',
    device: uaInfo.device.vendor
      ? uaInfo.device.vendor + ' ' + uaInfo.device.model + ' ' + uaInfo.device.type
      : '未知设备',
  };
};

@Injectable()
export class ViewService {
  constructor(
    @InjectRepository(View)
    private readonly viewRepository: Repository<View>
  ) {}

  /**
   * 添加访问
   * @param tag
   */
  async create(ip: string, userAgent: string, url: string): Promise<View> {
    const exist = await this.viewRepository.findOne({
      where: { ip, userAgent, url },
    });
    if (exist) {
      const count = exist.count;
      const newData = await this.viewRepository.merge(exist, {
        count: count + 1,
      });
      await this.viewRepository.save(newData);
      return newData;
    }
    const uaInfo = parseUserAgent(userAgent);
    const { region } = ipSearcher.btreeSearchSync(ip);
    const address = region
      .split('|')
      .filter((d) => +d !== 0)
      .join(' ');
    const newData = await this.viewRepository.create({ ip, userAgent, url, address, ...uaInfo });
    await this.viewRepository.save(newData);
    return newData;
  }

  /**
   * 获取所有访问
   */
  async findAll(queryParams): Promise<[View[], number]> {
    const query = this.viewRepository.createQueryBuilder('view').orderBy('view.createAt', 'DESC');
    if (typeof queryParams === 'object') {
      const { page = 1, pageSize = 12, pass, ...otherParams } = queryParams;
      query.skip((+page - 1) * +pageSize);
      query.take(+pageSize);

      if (otherParams) {
        Object.keys(otherParams).forEach((key) => {
          query
            .andWhere(`view.${key} LIKE :${key}`)
            .setParameter(`${key}`, `%${otherParams[key]}%`);
        });
      }
    }

    return query.getManyAndCount();
  }

  /**
   * 查找指定路径访问统计
   * @param url
   */
  async findByUrl(url): Promise<View[]> {
    return this.viewRepository.find({
      where: { url },
      order: { updateAt: 'ASC' },
    });
  }

  /**
   * 获取指定访问
   * @param id
   */
  async findById(id): Promise<View> {
    return this.viewRepository.findOne(id);
  }

  /**
   * 删除访问量
   * @param id
   */
  async deleteById(id) {
    const data = await this.viewRepository.findOne(id);
    return this.viewRepository.remove(data);
  }
}
