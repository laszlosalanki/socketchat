import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class ChatMessageSchema {
  @Prop({})
  public created_at: number;
  @Prop({})
  public content: string;
  @Prop({})
  public created_by: string;
}
