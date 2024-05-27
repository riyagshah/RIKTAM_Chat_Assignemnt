
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from '../schema/auth.schema';
import mongoose, * as moongose from 'mongoose';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,

    @InjectModel(Auth.name)
    private AuthModel: moongose.Model<AuthDocument>,
  ) { }

  async generateToken(payload: LoginDto): Promise<string> {
    try {
      const userDetail = await this.AuthModel.findOne({
        username: payload.username,
      });
      if (userDetail) {
        try {
          const access_token = this.jwtService.sign({ ...payload, id: userDetail._id })
          return access_token;
        }
        catch (err) {
          console.log(err)
        }
      }

    } catch (err) {
      return null;
    }

  }

  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      return null;
    }
  }
}
