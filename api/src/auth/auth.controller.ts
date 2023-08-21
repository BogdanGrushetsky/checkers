import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LocalAuthGuard } from './guard/local.guard';
import { jwtData } from './auth.interface';
import { loginAuthDto } from './dto/login-auth.dto';
import { ApiBody } from '@nestjs/swagger';
import { RegistrationAuthDto } from './dto/registration-auth.dto copy';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private UserService: UserService) { }

  @ApiBody({ type: loginAuthDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user as jwtData);
  }

  @Post('registration')
  async registration(@Body() createUserDto: RegistrationAuthDto) {
    const oldUser = await this.UserService.findOneByEmail(createUserDto.email);
    if (oldUser) {
      throw new Error('User already exists');
    }
    const user = await this.authService.registration(createUserDto);
    return this.authService.login({ _id: user._id, email: user.email, role: user.role });
  }


}
