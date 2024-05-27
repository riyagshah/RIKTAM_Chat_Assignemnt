import { HttpStatus, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Auth, AuthDocument } from 'src/schema/auth.schema';
import * as moongose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(Auth.name)

    private UserModel: moongose.Model<AuthDocument>,

  ) { }

  async use(req: any, res: Response, next: NextFunction) {
    const user = await this.UserModel.findById(req.user.id).exec();
    if (user.role !== 'admin') {
      return res.status(HttpStatus.CONFLICT).json({ message: 'Forbidden!User is not authorized,user has to admin' });
    }

    next();
  }
}
