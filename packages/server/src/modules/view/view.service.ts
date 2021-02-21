import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { View } from './view.entity';

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

    const newData = await this.viewRepository.create({ ip, userAgent, url });
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
}
