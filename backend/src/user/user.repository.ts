import { RepositoryBase } from '../utilities/repository.base';
import { UserDocument, UserModel } from './models/user.schema';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

export class UserRepository extends RepositoryBase<UserDocument> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(UserModel.name) userModel: Model<UserDocument>,
  ) {
    super(connection, userModel);
  }
}
