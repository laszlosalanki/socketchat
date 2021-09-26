import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import localizationConfiguration from './config/localization.configuration';
import { MongoDbModule } from './database/mongodb.module';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, localizationConfiguration],
    }),
    MongoDbModule,
    UserModule,
    EventsModule,
  ],
  controllers: [],
})
export class AppModule {}
