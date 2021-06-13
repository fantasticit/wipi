import { HttpException, HttpStatus } from '@nestjs/common';
import { SettingService } from '../modules/setting/setting.service';
const OSS = require('ali-oss');

export async function putFile(
  settingService: SettingService,
  filepath: string,
  buffer: ReadableStream
) {
  const {
    ossRegion,
    ossAccessKeyId,
    ossBucket,
    ossAccessKeySecret,
    ossHttps,
  } = await settingService.findAll(true);
  if (!ossRegion || !ossAccessKeyId || !ossBucket || !ossAccessKeySecret) {
    throw new HttpException('OSS 配置不完善，无法进行操作', HttpStatus.BAD_REQUEST);
  }
  const client = new OSS({
    region: ossRegion,
    accessKeyId: ossAccessKeyId,
    accessKeySecret: ossAccessKeySecret,
    bucket: ossBucket,
    secure: ossHttps,
  });
  const { url } = await client.put(filepath, buffer);
  return url;
}

export async function deleteFile(settingService: SettingService, url: string) {
  const {
    ossRegion,
    ossAccessKeyId,
    ossBucket,
    ossAccessKeySecret,
    ossHttps,
  } = await settingService.findAll(true);
  if (!ossRegion || !ossAccessKeyId || !ossBucket || !ossAccessKeySecret) {
    throw new HttpException('OSS 配置不完善，无法进行操作', HttpStatus.BAD_REQUEST);
  }
  const client = new OSS({
    region: ossRegion,
    accessKeyId: ossAccessKeyId,
    accessKeySecret: ossAccessKeySecret,
    bucket: ossBucket,
    secure: ossHttps,
  });

  await client.delete(url);
}
