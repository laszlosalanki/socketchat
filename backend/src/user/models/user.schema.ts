import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserModel & Document;

@Schema()
class PersonalizationModel {
  @Prop({ required: true })
  public background: string;
}

@Schema()
export class UserModel {
  @Prop({ required: true })
  public username: string;
  @Prop({ required: false })
  public password: string;
  @Prop({ required: false, default: null })
  public email: string;
  @Prop({ required: false, default: 0.0 })
  public spent_time: number;
  @Prop({ required: false, default: null })
  public personalization: PersonalizationModel;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
