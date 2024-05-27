import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Auth, AuthDocument } from 'src/schema/auth.schema';
import * as moongose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from 'src/schema/group.schema';

@Injectable()
export class GroupValidityMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(Group.name)

    private GroupModel: moongose.Model<GroupDocument>,

  ) { }

  async use(req: any, res: Response, next: NextFunction) {
    if (!req.body.id || !moongose.Types.ObjectId.isValid(req.body.id)) {
      return res.status(403).json({ message: 'Invalid ObjectId' });
    }
    const group = await this.GroupModel.findById(new moongose.Types.ObjectId(req.body.id)).exec();
    if (!group) {

      res.status(403).send('No such group exist!');

    }
    const isUserMember= await this.GroupModel.exists({
      _id: req.body.id,
      'members': req.user.id

  });
  if (!isUserMember) {
      return res.status(403).send('The user is not authorized to delete the group because they are not a member of the group.!');

  }
    next();
  }
}
