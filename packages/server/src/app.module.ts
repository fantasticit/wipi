import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// 鉴权模块
import { AuthModule } from './modules/auth/auth.module';
// 用户模块
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/user.entity';
// 文件模块
import { FileModule } from './modules/file/file.module';
import { File } from './modules/file/file.entity';
// 文章模块
import { ArticleModule } from './modules/article/article.module';
import { Article } from './modules/article/article.entity';
// 分类模块
import { CategoryModule } from './modules/category/category.module';
import { Category } from './modules/category/category.entity';
// 标签模块
import { TagModule } from './modules/tag/tag.module';
import { Tag } from './modules/tag/tag.entity';
// 评论模块
import { CommentModule } from './modules/comment/comment.module';
import { Comment } from './modules/comment/comment.entity';
// 系统模块
import { SettingModule } from './modules/setting/setting.module';
import { Setting } from './modules/setting/setting.entity';
// 邮件模块
import { SMTPModule } from './modules/smtp/smtp.module';
import { SMTP } from './modules/smtp/smtp.entity';
// 页面模块
import { PageModule } from './modules/page/page.module';
import { Page } from './modules/page/page.entity';
// 访问统计模块
import { ViewModule } from './modules/view/view.module';
import { View } from './modules/view/view.entity';
// 搜索模块
import { Search } from './modules/search/search.entity';
import { SearchModule } from './modules/search/search.module';
// 配置文件

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        entities: [User, File, Tag, Article, Category, Comment, Setting, SMTP, Page, View, Search],
        host: configService.get('DB_HOST', '0.0.0.0'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USER', 'root'),
        password: configService.get('DB_PASSWD', 'root'),
        database: configService.get('DB_DATABASE', 'wipi'),
        charset: 'utf8mb4',
        timezone: '+08:00',
      }),
    }),
    UserModule,
    FileModule,
    TagModule,
    ArticleModule,
    CategoryModule,
    CommentModule,
    SettingModule,
    SMTPModule,
    AuthModule,
    PageModule,
    ViewModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
