import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import localizationConfiguration from './config/localization.configuration';
import { MongoDbModule } from './database/mongodb.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, localizationConfiguration],
    }),
    MongoDbModule,
    UserModule,
  ],
  controllers: [],
})
export class AppModule {}
