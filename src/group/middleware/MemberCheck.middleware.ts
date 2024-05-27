import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Auth, AuthDocument } from 'src/schema/auth.schema';
import * as moongose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from 'src/schema/group.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class MemberCheckMiddleware implements NestMiddleware {
    constructor(
        @InjectModel(Group.name)

        private GroupModel: moongose.Model<GroupDocument>,
        @InjectModel(Auth.name)

        private AuthModel: moongose.Model<AuthDocument>,

    ) { }

    async use(req: any, res: Response, next: NextFunction) {
        const isvalidGId= ObjectId.isValid(req.body.groupid);
        if(!isvalidGId)
           {

              return res.status(403).send({message:'Invalid GroupId!'});

           }
           const isvalidUId= ObjectId.isValid(req.body.userid);
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
     
        const isUserMember= await this.GroupModel.exists({
            _id: req.body.groupid,
            'members': req.user.id

        });
        if (!isUserMember) {
            return res.status(403).send('User is not athorized to add any member as member is not part of the group!');

        }
        const memberExists = await this.GroupModel.exists({
            _id: req.body.groupid,
            'members': req.body.userid

        });
        if (memberExists) {
            return res.status(403).send('Member Already Exist in the group!');

        }
        const isNewUserValiduser = await this.AuthModel.exists({
            _id: req.body.userid,


        });
        if (!isNewUserValiduser) {
            return res.status(403).send('User doesnt exist with this userId,Please as a admin to register!');

        }
        next();
    }
}
