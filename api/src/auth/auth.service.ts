import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { UserSchema } from 'src/user/user.schema';
import { jwtData } from './auth.interface';
import { RegistrationAuthDto } from './dto/registration-auth.dto copy';

@Injectable()
export class AuthService {

  constructor(private UserService: UserService,
    private jwtService: JwtService) { }

  async validationUser(email: string, passwordLogin: string) {

    const user = await this.UserService.findOneByEmail(email);
    const isMatch = await bcrypt.compare(passwordLogin, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }


    const userData = { _id: user._id, email: user.email, role: user.role };
    return userData
  }
  async login(userJwtData: jwtData) {
    const payload = { ...userJwtData };
    const user = await this.UserService.findOneByEmail(payload.email);
    return {
      name: user.name,
      email: user.email,
      role: user.role,
      _id: user._id,
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  async registration(createUserDto: RegistrationAuthDto) {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const user = await this.UserService.create({ ...createUserDto, password: hashPassword });
    return user
  }
}
