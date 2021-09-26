import { Module } from '@nestjs/common';
import { EventsGateway } from './events';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [EventsGateway],
})

export class EventsModule {}