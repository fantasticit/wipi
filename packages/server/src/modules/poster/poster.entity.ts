import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Poster {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  size: number;

  @ApiProperty()
  @Column()
  pageUrl: string; // 生产海报的页面路径

  @ApiProperty()
  @Column({ type: 'text', default: null })
  imgUrl: string; // 海报源文件上传到 oss 的下载链接

  @ApiProperty()
  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at',
  })
  createAt: Date;
}
