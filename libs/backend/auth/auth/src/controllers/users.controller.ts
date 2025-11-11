import { All, Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { SignInOptions, SignUpOptions } from '@mono/types/auth';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  users() {
    return this.usersService.get();
  }

  @Get('get-session')
  session(@Req() req: Request) {
    return this.usersService.session(req);
  }

  @Post('sign-in/email')
  async signIn(@Body() body: SignInOptions) {
    console.log('body', body);
    return this.usersService.signIn(body);
  }

  @Post('sign-up/email')
  async signUp(@Body() body: SignUpOptions) {
    return this.usersService.signUp(body);
  }
}
