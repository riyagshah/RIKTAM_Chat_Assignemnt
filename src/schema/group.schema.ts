import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Message } from './comman/message.schema';
import { Member } from './comman/members.schema';

@Schema({
  timestamps: true,
})
export class Group {
  @Prop({ type: String })
  groupname: string
  @Prop({ type: Array, default: [] })
  members: Member[]
  @Prop({ type: Array, default: [] })
  messages: Message[]


}
export type GroupDocument = Group & Document


export const GroupSchema = SchemaFactory.createForClass(Group);
GroupSchema.index({ groupname: 'text' });
