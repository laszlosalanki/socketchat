import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserServiceImpl } from './user.service';
import { TYPES } from '../utilities/types';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './models/user.schema';
import { UserRepository } from './user.repository';
import { AuthModule } from '../auth/auth.module';

const userService = {
  useClass: UserServiceImpl,
  provide: TYPES.UserService,
};

const userRepository = {
  useClass: UserRepository,
  provide: TYPES.UserRepository,
};

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [userService, userRepository],
})
export class UserModule {}
