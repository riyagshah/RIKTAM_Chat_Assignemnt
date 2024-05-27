import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Auth } from "../auth.schema";
@Schema()
export class Member{

    @Prop({ type: Types.ObjectId, ref:Auth.name, required: true })
    userId:  Types.ObjectId|Auth;
}
const schema=SchemaFactory.createForClass(Member)
export const MemberSchema=schema;