import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { config } from '../../config';
import { View } from './view.entity';

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
  ) {
    this.parseIpAddress(0).then((task) => task());
  }

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
    const newData = await this.viewRepository.create({ ip, userAgent, url, ...uaInfo });
    await this.viewRepository.save(newData);
    return newData;
  }

  /**
   * 获取所有访问
   */
  async findAll(queryParams: any = {}): Promise<[View[], number]> {
    const query = this.viewRepository.createQueryBuilder('view').orderBy('view.createAt', 'DESC');

    const { page = 1, pageSize = 12, pass, ...otherParams } = queryParams;

    query.skip((+page - 1) * +pageSize);
    query.take(+pageSize);

    if (otherParams) {
      Object.keys(otherParams).forEach((key) => {
        query.andWhere(`view.${key} LIKE :${key}`).setParameter(`${key}`, `%${otherParams[key]}%`);
      });
    }

    return query.getManyAndCount();
  }

  /**
   * 查找指定路径访问统计
   * @param url
   */
  async findByUrl(url): Promise<any> {
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
   * 更新地址
   * @param id
   * @param address
   */
  async updateIpAddress(id, { address }): Promise<View> {
    const old = await this.viewRepository.findOne(id);
    const updatedPage = await this.viewRepository.merge(old, {
      address,
      updateAt: old.updateAt,
    });
    return this.viewRepository.save(updatedPage);
  }

  /**
   * 删除访问量
   * @param id
   */
  async deleteById(id) {
    const data = await this.viewRepository.findOne(id);
    return this.viewRepository.remove(data);
  }

  /**
   * 自动任务，解析 ip 地址，依赖聚合数据的 key
   * 请到 https://apis.juhe.cn/ip/ 申请 key 值
   */
  async parseIpAddress(start) {
    if (!config.juheApiKey) return Promise.reject();

    const query = this.viewRepository.createQueryBuilder('view');
    query.skip(start);
    query.take(1);

    // 解析完毕
    const count = await query.getCount();
    if (start > count) return Promise.reject();

    const view = await query.getOne();
    const patch = {};
    if (!view.browser || !view.os || !view.engine || !view.device) {
      const uaInfo = parseUserAgent(view.userAgent);
      Object.assign(patch, uaInfo);
    }
    try {
      const res = (await axios.get(
        `https://apis.juhe.cn/ip/ipNew?key=${config.juheApiKey}&ip=${view.ip}`
      )) as any;
      if (+res.data.resultcode === 200) {
        const data = res.data.result;
        const address = `${data.Country} ${data.Province} ${data.City} ${data.Isp}`;
        Object.assign(patch, { address });
      }
    } catch (e) {}
    const newView = await this.viewRepository.merge(view, {
      ...patch,
      updateAt: view.updateAt,
    });
    this.viewRepository.save(newView);
    return this.parseIpAddress(start + 1);
  }
}
