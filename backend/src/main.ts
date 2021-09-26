import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionFilterImpl } from './utilities/exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  const configService = app.get<ConfigService>(ConfigService);
  app.useGlobalFilters(new ExceptionFilterImpl(configService));
  await app.listen(3000);
}
bootstrap();
