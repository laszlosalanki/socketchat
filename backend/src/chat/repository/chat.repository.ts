import { RepositoryBase } from '../../utilities/repository.base';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ChatRoomDocument, ChatRoomModel } from '../models/chat-room.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatRepository extends RepositoryBase<ChatRoomDocument> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(ChatRoomModel.name)
    chatRoomDocumentModel: Model<ChatRoomDocument>,
  ) {
    super(connection, chatRoomDocumentModel);
  }

  public override async findAll(): Promise<Array<ChatRoomDocument>> {
    return this.model.find({}, { name: 1, default_language: 1, _id: 0 });
  }
}
