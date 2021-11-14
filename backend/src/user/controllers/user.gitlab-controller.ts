import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { TYPES } from '../../utilities/types';
import { UserService } from '../interfaces/user.service.interface';
import { AuthService } from '../../auth/interfaces/auth.service.interface';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthBaseController } from './user.auth-base-controller';

interface LoginResult {
  token: string;
}

@Controller('gitlab')
export class UserGitLabController extends UserAuthBaseController {
  constructor(
    @Inject(TYPES.UserService)
    userService: UserService,
    @Inject(TYPES.AuthService)
    authService: AuthService,
  ) {
    super(userService, authService);
  }

  @Get()
  @UseGuards(AuthGuard('gitlab'))
  protected override async auth() {}

  @Get('login')
  @UseGuards(AuthGuard('gitlab'))
  protected override async authRedirect(@Req() request, @Res() response) {
    await super.authRedirect(request, response);
  }
}
