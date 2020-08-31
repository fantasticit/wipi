import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalname: string; // 文件名

  @Column()
  filename: string; // 文件名

  @Column()
  type: string; // 文件信息

  @Column()
  size: number; // 文件大小

  @Column()
  url: string;

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at',
  })
  createAt: Date;
}
