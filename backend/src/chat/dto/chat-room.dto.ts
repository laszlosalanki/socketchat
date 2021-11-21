import { ChatMessageSchema } from '../models/chat-message.schema';

export interface ChatRoomDto {
  name: string;
  created_at: number;
  messages: Array<ChatMessageSchema>;
  owner: string;
  default_language: string;
}
