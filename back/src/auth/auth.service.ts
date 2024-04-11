import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  saltOrRounds = 10;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user?.password !== password) {
      const isMatch = await bcrypt.compare(password, user?.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
    }

    return {
      access_token: await this.jwtService.signAsync(
        { email: user.email },
        { secret: jwtConstants.secret },
      ),
    };
  }

  async signUp(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    if (user) {
      throw new HttpException('User Already Exists', HttpStatus.CONFLICT);
    }

    const hashPass = await bcrypt.hash(password, this.saltOrRounds);
    const newUser = await this.usersService.create({
      email,
      password: hashPass,
    });
    return {
      access_token: await this.jwtService.signAsync(
        { email: newUser.email },
        { secret: jwtConstants.secret },
      ),
    };
  }
}
