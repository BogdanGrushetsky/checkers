import { Controller, Get, Post, Body, Patch, Param, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JWTauthGuard } from 'src/auth/guard/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JWTauthGuard)
  @Get('personalData')
  async MyData(@Request() req) {
    const data = await this.userService.findOneByEmail(req.user.email);
    return { name: data.name, email: data.email, role: data.role, _id: data._id }
  }

  @Get('online')
  async AllUserOnline() {
    const users = await this.userService.getAll({ online: -1 }, { online: true });
    return users
  }
  @Get('rating')
  async AllUserRating() {
    const users = await this.userService.getAll({ skore: -1 });
    return users
  }

  @UseGuards(JWTauthGuard)
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    return this.userService.update(req.user._id, updateUserDto);
  }

}
