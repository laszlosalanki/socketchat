import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-github';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';

@Injectable()
export class GithubAuthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('auth.github.client_id'),
      clientSecret: configService.get<string>('auth.github.client_secret'),
      callbackURL: configService.get<string>('auth.github.callback_url'),
      scope: ['user:email'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const primaryEmail = await GithubAuthStrategy.getPrimaryEmail(accessToken);

    const user = {
      username: profile.username,
      email: primaryEmail,
    };

    done(null, user);
  }

  private static async getPrimaryEmail(accessToken: string): Promise<string> {
    const request = await fetch(`https://api.github.com/user/emails`, {
      method: 'GET',
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const emails = await request.json();

    return emails.find((email) => email.primary)?.email;
  }
}
