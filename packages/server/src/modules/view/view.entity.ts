import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class View {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ip: string;

  @Column({ type: 'text', default: null })
  userAgent: string;

  @Column({ type: 'text', default: null })
  url: string;

  @Column({ default: 1 })
  count: number; // 同一 userAgent ，同一 url 的访问量

  @Column({ type: 'text', default: null })
  address: string; // 访问地址

  @Column({ type: 'text', default: null })
  browser: string; // 访问浏览器

  @Column({ type: 'text', default: null })
  engine: string; // 访问的浏览器内核

  @Column({ type: 'text', default: null })
  os: string; // 访问操作系统

  @Column({ type: 'text', default: null })
  device: string; // 访问设备

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
