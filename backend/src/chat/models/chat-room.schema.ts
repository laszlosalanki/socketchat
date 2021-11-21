import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ChatMessageSchema } from './chat-message.schema';
import { Document } from 'mongoose';

export type ChatRoomDocument = ChatRoomModel & Document;

@Schema()
export class ChatRoomModel {
  @Prop({ required: true, unique: true })
  public name: string;
  @Prop({ required: true })
  public created_at: number;
  @Prop({ required: false, default: [] })
  public messages: Array<ChatMessageSchema>;
  @Prop({ required: true })
  public owner: string;
  @Prop({ required: true })
  public default_language: string;
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoomModel);
