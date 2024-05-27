import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/createUser..dto';
import { Auth, AuthDocument } from '../schema/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, * as moongose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUserDto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(private readonly jwtService: JwtService,
    @InjectModel(Auth.name)
    private UserModel: moongose.Model<AuthDocument>,
  ) { }

  async create(user: CreateUserDto): Promise<Auth> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const result = await this.UserModel.create({ ...user, password: hashedPassword });
    return result
  }

  generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      return null;
    }
  }

  async updateUser(updateChatDto: UpdateUserDto) {

    const user = await this.UserModel.findOne({ username: updateChatDto.current_username });

    return this.UserModel.findByIdAndUpdate(user._id, { $set: updateChatDto }, { new: true });
  }
}