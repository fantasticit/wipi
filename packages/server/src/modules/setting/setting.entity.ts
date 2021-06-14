import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Setting {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'text', default: null })
  i18n: string; // 国际化

  @ApiProperty()
  @Column({ type: 'text', default: null })
  systemUrl: string; // 系统地址

  @ApiProperty()
  @Column({ type: 'text', default: null })
  systemTitle: string; // 系统标题

  @ApiProperty()
  @Column({ type: 'text', default: null })
  systemLogo: string; // 系统Logo

  @ApiProperty()
  @Column({ type: 'text', default: null })
  systemFavicon: string; // 系统 favicon

  @ApiProperty()
  @Column({ type: 'text', default: null })
  systemFooterInfo: string; // 系统页脚

  @ApiProperty()
  @Column({ type: 'text', default: null })
  adminSystemUrl: string; // 后台系统地址

  @ApiProperty()
  @Column({ type: 'text', default: null })
  baiduAnalyticsId: string; // 百度统计id

  @ApiProperty()
  @Column({ type: 'text', default: null })
  googleAnalyticsId: string; // 谷歌分析 id

  @ApiProperty()
  @Column({ type: 'text', default: null })
  seoKeyword: string; // SEO 关键词

  @ApiProperty()
  @Column({ type: 'text', default: null })
  seoDesc: string; // SEO 描述

  @ApiProperty()
  @Column({ type: 'text', default: null })
  ossRegion: string; // 阿里云 region

  @ApiProperty()
  @Column({ type: 'text', default: null })
  ossAccessKeyId: string; // 阿里云 accessKeyId

  @ApiProperty()
  @Column({ type: 'text', default: null })
  ossAccessKeySecret: string; // 阿里云  accessKeySecret

  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  ossHttps: boolean; // 阿里云 oss 是否开启 https

  @ApiProperty()
  @Column({ type: 'text', default: null })
  ossBucket: string; // 阿里云 bucket

  @ApiProperty()
  @Column({ type: 'text', default: null })
  smtpHost: string; // SMTP 地址

  @ApiProperty()
  @Column({ type: 'text', default: null })
  smtpPort: string; // SMTP 端口

  @ApiProperty()
  @Column({ type: 'text', default: null })
  smtpUser: string; // SMTP 用户

  @ApiProperty()
  @Column({ type: 'text', default: null })
  smtpPass: string; // SMTP 授权码

  @ApiProperty()
  @Column({ type: 'text', default: null })
  smtpFromUser: string; // SMTP 发件人

  @ApiProperty()
  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at',
  })
  createAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'update_at',
  })
  updateAt: Date;
}
