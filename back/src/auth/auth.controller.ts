import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/constants';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() user: UserDto) {
    return this.authService.login(user.email, user.password);
  }

  @Public()
  @Post('signup')
  signUp(@Body() user: UserDto) {
    return this.authService.signUp(user.email, user.password);
  }
}
