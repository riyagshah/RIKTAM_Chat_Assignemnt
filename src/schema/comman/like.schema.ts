import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Auth } from "../auth.schema";
@Schema()
export class Like{

    @Prop({ type: Types.ObjectId, ref:Auth.name, required: true })
    userId:  Types.ObjectId|Auth;
}
const schema=SchemaFactory.createForClass(Like)
export const LikeSchema=schema;