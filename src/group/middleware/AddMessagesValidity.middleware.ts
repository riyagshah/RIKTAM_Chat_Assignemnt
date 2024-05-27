import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Auth, AuthDocument } from 'src/schema/auth.schema';
import * as moongose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from 'src/schema/group.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class AddMessagesValidityMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(Group.name)

    private GroupModel: moongose.Model<GroupDocument>,

  ) { }

  async use(req: any, res: Response, next: NextFunction) {
    const isvalidGId= ObjectId.isValid(req.body.groupid);
    if(!isvalidGId)
       {

          return res.status(403).send({message:'Invalid GroupId!'});

       }
       const isvalidUId= ObjectId.isValid(req.body.senderid);
       if(!isvalidUId)
          {
            return res.status(403).send({message:'Invalid UserId!'});
        }
 
    const GroupExists = await this.GroupModel.exists({
        _id: req.body.groupid,
    });

    if (!GroupExists) {
        return res.status(403).send('No such Group Exist!');

    }
    const memberExists = await this.GroupModel.exists({
        _id: req.body.groupid,
        'members': req.body.senderid
    });
    if (!memberExists) {
        return res.status(403).send('Member is not part of the group !');

    }
    next();  
  }
}
