import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { TYPES } from '../utilities/types';
import { UserService } from './interfaces/user.service.interface';
import { userSchema } from './schemas/user.schema';
import { UserModel } from './models/user.schema';
import { PasswordMismatchException } from '../exception/password-mismatch.exception';

interface RegistrationData {
  username: string;
  password: string;
  password2: string;
}

interface LoginData {
  username: string;
  password: string;
}

@Controller()
export class UserController {
  constructor(
    @Inject(TYPES.UserService)
    private readonly userService: UserService,
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

    return this.userService.create(
      registrationData.username,
      registrationData.password,
    );
  }

  @Post('/login')
  @HttpCode(200)
  private async login(@Body() loginData: LoginData): Promise<UserModel> {
    return this.userService.getUser(loginData.username, loginData.password);
  }
}
