import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionFilterImpl } from './utilities/exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  app.useGlobalFilters(new ExceptionFilterImpl(configService));
  await app.listen(3000);
}
bootstrap();
