import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Search {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string; // 搜索类型

  @Column()
  keyword: string; // 搜索关键词

  @Column({ default: 1 })
  count: number;

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
