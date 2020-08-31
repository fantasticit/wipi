import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', default: null })
  systemUrl: string; // 系统地址

  @Column({ type: 'text', default: null })
  systemTitle: string; // 系统标题

  @Column({ type: 'text', default: null })
  systemLogo: string; // 系统Logo

  @Column({ type: 'text', default: null })
  systemFavicon: string; // 系统 favicon

  @Column({ type: 'text', default: null })
  systemFooterInfo: string; // 系统页脚

  @Column({ type: 'text', default: null })
  seoKeyword: string; // SEO 关键词

  @Column({ type: 'text', default: null })
  seoDesc: string; // SEO 描述

  @Column({ type: 'text', default: null })
  ossRegion: string; // 阿里云 region

  @Column({ type: 'text', default: null })
  ossAccessKeyId: string; // 阿里云 accessKeyId

  @Column({ type: 'text', default: null })
  ossAccessKeySecret: string; // 阿里云  accessKeySecret

  @Column({ type: 'boolean', default: false })
  ossHttps: boolean; // 阿里云 oss 是否开启 https

  @Column({ type: 'text', default: null })
  ossBucket: string; // 阿里云 bucket

  @Column({ type: 'text', default: null })
  smtpHost: string; // SMTP 地址

  @Column({ type: 'text', default: null })
  smtpPort: string; // SMTP 端口

  @Column({ type: 'text', default: null })
  smtpUser: string; // SMTP 用户

  @Column({ type: 'text', default: null })
  smtpPass: string; // SMTP 授权码

  @Column({ type: 'text', default: null })
  smtpFromUser: string; // SMTP 地址

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'update_at',
  })
  updateAt: Date;
}
