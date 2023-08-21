import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { RegistrationAuthDto } from 'src/auth/dto/registration-auth.dto copy';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: RegistrationAuthDto) {
    const user = new this.userModel(createUserDto);
    await user.save()
    return user
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id)
    user.name = updateUserDto.name;
    if (updateUserDto.email) user.email = updateUserDto.email
    await user.save()
    return user
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    return user
  }

  async getAll(optionSort?: any, filter?: any) {
    const users = await this.userModel.find(filter).select({ password: 0 }).sort(optionSort).exec();
    return users
  }
  async updateStatusOnline(id: string, status: boolean) {
    if (!id) {
      return
    }
    const user = await this.userModel.findById(id)
    user.online = status;
    user.save()
    return user
  }
  async updateSkore(id: string, skore: number) {
    if (!id) {
      return
    }
    const user = await this.userModel.findById(id)
    user.skore = (user?.skore + 0) + skore;
    user.save()
    return user
  }
  async getById(id: string) {
    const user = await this.userModel.findById(id).select({ password: 0 })
    return user
  }


}
