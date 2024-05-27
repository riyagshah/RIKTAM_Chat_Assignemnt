import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from '../schema/auth.schema';
import { ObjectId } from 'mongodb';

import mongoose, * as moongose from 'mongoose';

@Injectable()

export class UsersService {
   constructor(

      @InjectModel(Auth.name)
      private AuthModel: moongose.Model<AuthDocument>,
   ) { }
   findme(req: any) {

      return req.user.username
   }

   async findWithId(id: string) {
      const isvalidId= ObjectId.isValid(id);
      if(!isvalidId)
         {
            return {message:"Invalid userId"}
         }

      const userDetails = await this.AuthModel.findById(id);
  
      return userDetails;
   }
   async findByUsername(id: string) {
      const userDetails = await this.AuthModel.findOne({
         username: id,
      });
      return userDetails;
   }
}
