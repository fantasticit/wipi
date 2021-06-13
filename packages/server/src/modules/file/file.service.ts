import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { dateFormat } from '../../utils/date.util';
import { uniqueid } from '../../utils/uniqueid.util';
import { SettingService } from '../setting/setting.service';
import { File } from './file.entity';

const OSS = require('ali-oss');

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly settingService: SettingService
  ) {}

  /**
   * 上传文件
   * @param file
   */
  async uploadFile(file, unique): Promise<File> {
    const { originalname, mimetype, size, buffer } = file;
    const filename =
      +unique === 1
        ? `/${dateFormat(new Date(), 'yyyy-MM-dd')}/${uniqueid()}/${originalname}`
        : `/${dateFormat(new Date(), 'yyyy-MM-dd')}/${originalname}`;
    const {
      ossRegion,
      ossAccessKeyId,
      ossBucket,
      ossAccessKeySecret,
      ossHttps,
    } = await this.settingService.findAll(true);
    if (!ossRegion || !ossAccessKeyId || !ossBucket || !ossAccessKeySecret) {
      throw new HttpException('请完善 OSS 配置', HttpStatus.BAD_REQUEST);
    }
    const client = new OSS({
      region: ossRegion,
      accessKeyId: ossAccessKeyId,
      accessKeySecret: ossAccessKeySecret,
      bucket: ossBucket,
      secure: ossHttps,
    });
    const { url } = await client.put(filename, buffer);
    const newFile = await this.fileRepository.create({
      originalname,
      filename,
      url,
      type: mimetype,
      size,
    });
    await this.fileRepository.save(newFile);
    return newFile;
  }

  /**
   * 获取所有文件
   */
  async findAll(queryParams): Promise<[File[], number]> {
    const query = this.fileRepository.createQueryBuilder('file').orderBy('file.createAt', 'DESC');

    if (typeof queryParams === 'object') {
      const { page = 1, pageSize = 12, pass, ...otherParams } = queryParams;
      query.skip((+page - 1) * +pageSize);
      query.take(+pageSize);

      if (otherParams) {
        Object.keys(otherParams).forEach((key) => {
          query
            .andWhere(`file.${key} LIKE :${key}`)
            .setParameter(`${key}`, `%${otherParams[key]}%`);
        });
      }
    }

    return query.getManyAndCount();
  }

  /**
   * 获取指定文件
   * @param id
   */
  async findById(id): Promise<File> {
    return this.fileRepository.findOne(id);
  }

  async findByIds(ids): Promise<Array<File>> {
    return this.fileRepository.findByIds(ids);
  }

  /**
   * 删除文件
   * @param id
   */
  async deleteById(id) {
    const tag = await this.fileRepository.findOne(id);
    const {
      ossRegion,
      ossAccessKeyId,
      ossBucket,
      ossAccessKeySecret,
      ossHttps,
    } = await this.settingService.findAll(true);
    if (!ossRegion || !ossAccessKeyId || !ossBucket || !ossAccessKeySecret) {
      throw new HttpException('请完善 OSS 配置', HttpStatus.BAD_REQUEST);
    }
    const client = new OSS({
      region: ossRegion,
      accessKeyId: ossAccessKeyId,
      accessKeySecret: ossAccessKeySecret,
      bucket: ossBucket,
      secure: ossHttps,
    });
    await client.delete(tag.filename);
    return this.fileRepository.remove(tag);
  }
}
