import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatRoomModel, ChatRoomSchema } from './models/chat-room.schema';
import { TYPES } from '../utilities/types';
import { ChatRepository } from './repository/chat.repository';
import { ChatServiceImpl } from './service/chat.service';
import { TranslationServiceImpl } from './translation/service/translation.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { RoomController } from './controllers/room.controller';

const chatService = {
  useClass: ChatServiceImpl,
  provide: TYPES.ChatService,
};

const chatRepository = {
  useClass: ChatRepository,
  provide: TYPES.ChatRepository,
};

const translationService = {
  useClass: TranslationServiceImpl,
  provide: TYPES.TranslationService,
};

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    MongooseModule.forFeature([
      { name: ChatRoomModel.name, schema: ChatRoomSchema },
    ]),
  ],
  controllers: [RoomController],
  providers: [chatRepository, chatService, translationService, JwtStrategy],
  exports: [chatService, translationService, translationService],
})
export class ChatModule {}
