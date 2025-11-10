import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async users() {
    return this.usersService.get();
  }

  @Post('sign-up')
  async signUp() {
    console.log('signing up...');
    return this.usersService.signUp();
  }
}
