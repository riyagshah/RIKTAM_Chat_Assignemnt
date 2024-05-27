import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User_Role } from '../constants/index';

@Schema({
  timestamps: true
})
export class Auth {

  @Prop(
    {
      required:true
    }
  )
  username: string;
  @Prop(
   {
    default:User_Role.NORMAL,required:true
   }
  )
  role: string;
  @Prop(
    {
    required:true
    }
   )
   password: string;
}
export type AuthDocument = Auth & Document


export const AuthSchema = SchemaFactory.createForClass(Auth);
