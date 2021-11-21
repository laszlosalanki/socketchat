import { Module } from '@nestjs/common';
import { EventsGateway } from './events';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [AuthModule, UserModule, ChatModule],
  providers: [EventsGateway],
})
export class EventsModule {}
