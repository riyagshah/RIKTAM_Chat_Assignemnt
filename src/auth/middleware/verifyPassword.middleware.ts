import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Auth, AuthDocument } from 'src/schema/auth.schema';
import * as moongose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from 'src/schema/group.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class VerifyPasswordMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(Auth.name)

    private AuthModel: moongose.Model<AuthDocument>,

  ) { }

  async use(req: any, res: Response, next: NextFunction) {
    const user = await this.AuthModel.findOne({ username:req.body.username}).exec();
    if (!user) {
        return res.status(403).send('User doesnt exist Please re-check the entered username!');    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
        return res.status(403).send('Password is incorrect!');    }
    next();
  }
}
