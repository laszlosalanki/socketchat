import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-gitlab2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GitLabAuthStrategy extends PassportStrategy(Strategy, 'gitlab') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('auth.gitlab.client_id'),
      clientSecret: configService.get<string>('auth.gitlab.client_secret'),
      callbackURL: configService.get<string>('auth.gitlab.callback_url'),
      scope: ['read_user'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = {
      username: profile.username,
      email: profile.emails[0].value,
    };

    done(null, user);
  }
}
