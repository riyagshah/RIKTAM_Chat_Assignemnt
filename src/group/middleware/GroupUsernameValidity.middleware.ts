import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Auth, AuthDocument } from 'src/schema/auth.schema';
import * as moongose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from 'src/schema/group.schema';

@Injectable()
export class GroupUsernameValidityMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(Group.name)

    private GroupModel: moongose.Model<GroupDocument>,

  ) { }

  async use(req: any, res: Response, next: NextFunction) {

    const group = await this.GroupModel.findOne({ groupname: req.body.groupName }).exec();
    if (group) {

      return res.status(403).send('Group Already Exist!');

    }
    next();
  }
}
