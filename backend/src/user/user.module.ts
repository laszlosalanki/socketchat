import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserServiceImpl } from './user.service';
import { TYPES } from '../utilities/types';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './models/user.schema';
import { UserRepository } from './user.repository';
import { AuthModule } from '../auth/auth.module';
import { GoogleAuthStrategy } from '../auth/strategies/google-auth.strategy';
import { UserGoogleController } from './controllers/user.google-controller';
import { GithubAuthStrategy } from '../auth/strategies/github-auth.strategy';
import { UserGitHubController } from './controllers/user.github-controller';
import { UserGitLabController } from './controllers/user.gitlab-controller';
import { GitLabAuthStrategy } from '../auth/strategies/gitlab-auth.strategy';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

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
  controllers: [
    UserController,
    UserGoogleController,
    UserGitHubController,
    UserGitLabController,
  ],
  providers: [
    userService,
    userRepository,
    GithubAuthStrategy,
    GoogleAuthStrategy,
    GitLabAuthStrategy,
    JwtStrategy,
  ],
  exports: [userService],
})
export class UserModule {}
