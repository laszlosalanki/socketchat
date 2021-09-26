import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserModel & Document;

@Schema()
export class UserModel {
  @Prop({ required: true })
  public username: string;
  @Prop({ required: true })
  public password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
