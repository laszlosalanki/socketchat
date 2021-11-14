import { Req, Res } from '@nestjs/common';
import { UserService } from '../interfaces/user.service.interface';
import { AuthService } from '../../auth/interfaces/auth.service.interface';

interface LoginResult {
  token: string;
}

export abstract class UserAuthBaseController {
  protected constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  protected async auth() {}

  protected async authRedirect(@Req() request, @Res() response) {
    const { user } = request;

    const dbUser = await this.userService.findUser({ email: user.email });

    let username;

    if (dbUser) {
      // User exists => login
      username = dbUser.username;
    } else {
      // User does not exist => create account
      username = user.username;
      await this.userService.create({
        username,
        email: user.email,
        password: null,
      });
    }
    response.redirect(
      `${request.protocol}://${
        request.headers.host
      }?token=${await this.authService.createAuthToken(username)}`,
    );
  }
}
