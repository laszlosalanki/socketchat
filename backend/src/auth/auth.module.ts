import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthServiceImpl } from './auth.service';
import { TYPES } from '../utilities/types';

const AuthService = {
  provide: TYPES.AuthService,
  useClass: AuthServiceImpl,
};

@Module({
  imports: [
    ConfigModule,
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
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
