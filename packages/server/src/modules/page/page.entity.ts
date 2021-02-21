import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Page {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null })
  cover: string; // 页面封面

  @Column()
  name: string; // 页面名

  @Column()
  path: string; // 页面路径

  @Column({ type: 'int', default: 0 })
  order: number; // 顺序

  @Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' })
  content: string; // 原始内容

  @Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' })
  html: string; // 格式化内容，自动生成

  @Column({ type: 'mediumtext', default: null })
  toc: string; // 格式化内容索引，自动生成

  @Column('simple-enum', { enum: ['draft', 'publish'] })
  status: string; // 页面状态

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publishAt: Date; // 发布日期

  @Column({ type: 'int', default: 0 })
  views: number; // 阅读量

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
