import { AuthService } from './interfaces/auth.service.interface';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthServiceImpl implements AuthService {
  private readonly tokens: Map<string, string>; // only for assignment purposes, do not use anything similar in real world apps :)

  constructor(private readonly jwtService: JwtService) {
    this.tokens = new Map<string, string>();
  }

  public createAuthToken(username: string): Promise<string> {
    if (this.tokens.has(username)) {
      this.tokens.delete(username);
    }

    const iat = Date.now();
    const token = crypto.randomBytes(8).toString('base64');

    const payload = {
      username,
      iat,
      token,
    };

    return this.jwtService.signAsync(payload);
  }

  public async invalidateAuthToken(token: string): Promise<void> {
    const decoded = await this.jwtService.verifyAsync(token);
    this.tokens.delete(decoded.username);
  }

  public async verifyAuthToken(token: string): Promise<boolean> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);

      if (!this.tokens.has(decoded.username)) {
        return Promise.resolve(false);
      }

      return Promise.resolve(this.tokens.get(decoded.username) === token);
    } catch (error) {
      return Promise.resolve(false);
    }
  }
}
