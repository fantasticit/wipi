import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { dateFormat } from '../../utils/date.util';
import { createImage } from '../../utils/puppeteer.util';
import { Oss } from '../../utils/oss.util';
import { SettingService } from '../setting/setting.service';
import { Poster } from './poster.entity';

@Injectable()
export class PosterService {
  private oss: Oss;

  constructor(
    @InjectRepository(Poster)
    private readonly repository: Repository<Poster>,
    private readonly settingService: SettingService
  ) {
    this.oss = new Oss(this.settingService);
  }

  async createPoster({
    pageUrl,
    name,
    width,
    height,
    html,
  }): Promise<{ url: string; name: string }> {
    // 海报已生成
    const ret = await this.repository.findOne({ name });
    if (ret) {
      return { url: ret.imgUrl, name: ret.name };
    }

    const uploadPath = path.join(
      'poster',
      dateFormat(new Date(), 'yyyy-MM-dd'),
      `${pageUrl}/${name}.png`
    );
    const { size, buffer } = await createImage({ width, height, html, ratio: 2 });
    const url = await this.oss.putFile(uploadPath, buffer);
    const data = await this.repository.create({
      name,
      size,
      pageUrl,
      imgUrl: url,
    });
    await this.repository.save(data);
    return { url: data.imgUrl, name: data.name };
  }

  /**
   * 获取所有文件
   */
  async findAll(queryParams): Promise<[Poster[], number]> {
    const query = this.repository.createQueryBuilder('poster').orderBy('poster.createAt', 'DESC');

    if (typeof queryParams === 'object') {
      const { page = 1, pageSize = 12, ...otherParams } = queryParams;
      query.skip((+page - 1) * +pageSize);
      query.take(+pageSize);

      if (otherParams) {
        Object.keys(otherParams).forEach((key) => {
          query
            .andWhere(`poster.${key} LIKE :${key}`)
            .setParameter(`${key}`, `%${otherParams[key]}%`);
        });
      }
    }

    return query.getManyAndCount();
  }

  /**
   * 删除文件
   * @param id
   */
  async deleteById(id) {
    const target = await this.repository.findOne(id);
    await this.oss.deleteFile(target.imgUrl);
    return this.repository.remove(target);
  }
}
