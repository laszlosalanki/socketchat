import { UserService } from './interfaces/user.service.interface';
import { Inject } from '@nestjs/common';
import { TYPES } from '../utilities/types';
import { UserRepository } from './user.repository';
import { UserModel } from './models/user.schema';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserExistsException } from '../exception/user-exists.exception';
import { InvalidCredentialsException } from '../exception/invalid-credentials.exception';

export class UserServiceImpl implements UserService {
  constructor(
    @Inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  public async create(userData: any): Promise<void> {
    const { username, email, password } = userData;

    if (await this.userRepository.exists({ username })) {
      throw new UserExistsException();
    }

    const user = new UserModel();
    user.username = username;

    if (!email) {
      user.password = await UserServiceImpl.hash(password);
    } else {
      user.email = email;
    }

    return this.userRepository.create(<UserModel & Document>user);
  }

  public async getUser(username: string, plainPassword: string): Promise<any> {
    const user = await this.userRepository.find({
      username,
    });

    if (!user || !(await bcrypt.compare(plainPassword, user.password))) {
      throw new InvalidCredentialsException();
    }

    if (user.email) {
      throw new InvalidCredentialsException();
    }

    return user;
  }

  public async findUser(filter: any): Promise<any> {
    return await this.userRepository.find(filter);
  }

  private static hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
