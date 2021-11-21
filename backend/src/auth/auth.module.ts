import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthServiceImpl } from './auth.service';
import { TYPES } from '../utilities/types';
import { PassportModule } from '@nestjs/passport';
import { GoogleAuthStrategy } from './strategies/google-auth.strategy';
import { GithubAuthStrategy } from './strategies/github-auth.strategy';
import { GitLabAuthStrategy } from './strategies/gitlab-auth.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

const AuthService = {
  provide: TYPES.AuthService,
  useClass: AuthServiceImpl,
};

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: function (configService: ConfigService) {
        const secret = configService.get<string>('jwt.secret');
        const expiration = configService.get<string>('jwt.expiration');

        return {
          secret,
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    GoogleAuthStrategy,
    GithubAuthStrategy,
    GitLabAuthStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
