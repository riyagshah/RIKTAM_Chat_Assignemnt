import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Auth } from "../auth.schema";
import { Like } from "./like.schema";
@Schema()
export class Message {

    @Prop({ type: Types.ObjectId, ref: Auth.name, required: true })
    senderId: Types.ObjectId | Auth;

    @Prop({ required: true })
    message: string;
    @Prop({ required: true, default: [] })
    like: Like[];
    @Prop()
    createdAt: Date;

}
const schema = SchemaFactory.createForClass(Message)
export const MessageSchema = schema;