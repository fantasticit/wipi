import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix(app.get('ConfigService').get('SERVER_API_PREFIX', '/api'));
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 minutes
      max: 10000, // limit each IP to 1000 requests per windowMs
    })
  );
  app.use(compression()); // 启用 gzip 压缩
  app.use(helmet());
  app.useGlobalInterceptors(new TransformInterceptor()); // 正常情况下，响应值统一
  app.useGlobalFilters(new HttpExceptionFilter()); // 异常情况下，响应值统一
  app.use(bodyParser.json({ limit: '10mb' })); // 修改请求的容量
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Wipi Open Api')
    .setDescription('Wipi Open Api Document')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(app.get('ConfigService').get('SERVER_PORT', 3003));
  console.log('[wipi] 服务启动成功');
}

bootstrap();
