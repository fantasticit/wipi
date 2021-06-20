import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class File {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  originalname: string; // 文件名

  @ApiProperty()
  @Column()
  filename: string; // 文件名

  @ApiProperty()
  @Column()
  type: string; // 文件信息

  @ApiProperty()
  @Column()
  size: number; // 文件大小

  @ApiProperty()
  @Column()
  url: string;

  @ApiProperty()
  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at',
  })
  createAt: Date;
}
