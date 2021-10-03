import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionFilterImpl } from './utilities/exception.filter';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useStaticAssets(join(__dirname, 'public'));
  app.setViewEngine('html');
  const configService = app.get<ConfigService>(ConfigService);
  app.useGlobalFilters(new ExceptionFilterImpl(configService));

  const host = configService.get<string>('http.host');
  const port = configService.get<number>('http.port');

  await app.listen(port, host);
}
bootstrap();
