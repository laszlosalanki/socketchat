import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Query,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TYPES } from '../../utilities/types';
import { UserService } from '../interfaces/user.service.interface';
import { userSchema } from '../schemas/user.schema';
import { UserModel } from '../models/user.schema';
import { PasswordMismatchException } from '../../exception/password-mismatch.exception';
import { log } from 'util';
import { AuthService } from '../../auth/interfaces/auth.service.interface';
import { AuthGuard } from '@nestjs/passport';

interface RegistrationData {
  username: string;
  password: string;
  password2: string;
}

interface LoginData {
  username: string;
  password: string;
}

interface LoginResult {
  token: string;
}

@Controller()
export class UserController {
  constructor(
    @Inject(TYPES.UserService)
    private readonly userService: UserService,
    @Inject(TYPES.AuthService)
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  @HttpCode(201)
  private async register(
    @Body() registrationData: RegistrationData,
    @Query('lang') lang: string,
  ): Promise<void> {
    await userSchema.validateAsync(registrationData);

    if (registrationData.password !== registrationData.password2) {
      throw new PasswordMismatchException();
    }

    return this.userService.create({
      username: registrationData.username,
      password: registrationData.password,
    });
  }

  @Post('/login')
  @HttpCode(200)
  private async login(@Body() loginData: LoginData): Promise<LoginResult> {
    const user = await this.userService.getUser(
      loginData.username,
      loginData.password,
    );

    return {
      token: await this.authService.createAuthToken(user.username),
    };
  }

  @Post('/logout')
  @HttpCode(200)
  private async logout(@Body() data: any): Promise<any> {
    await this.authService.invalidateAuthToken(data.token);
  }

  @Get()
  @Render('index')
  private index(): void {}
}
