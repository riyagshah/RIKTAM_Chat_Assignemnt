import { Injectable, Res } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from '../schema/group.schema';
import mongoose, * as moongose from 'mongoose';
import { Response } from 'express';
import { AddMemberDto } from './dto/addMember.dto';
import { AddMessagesDto } from './dto/add-messages.dto';
import { LikeMessagesDto } from './dto/like-messages.dto';
import { Types } from "mongoose";
import { SearchGroupDto } from './dto/search-group.dto';

@Injectable()
export class GroupService {

  constructor(
    @InjectModel(Group.name)
    private GroupModel: moongose.Model<GroupDocument>

  ) { }

  async create(createGroupDto: CreateGroupDto, req: any) {
    const res = await this.GroupModel.create({
      groupname: createGroupDto.groupName,
      members: [req.user.id]

    });
    return res;
  }
  async addMember(addMemberDto: AddMemberDto): Promise<GroupDocument> {
    return this.GroupModel.findOneAndUpdate(
      { _id: addMemberDto.groupid },
      { $push: { members: addMemberDto.userid } },
      { new: true }
    )
  }

  async deleteGroupById(id: string): Promise<any> {
    const group = await this.GroupModel.findByIdAndDelete(id);

    return group
  }

  async addMessage(AddMessagesDto: AddMessagesDto): Promise<any> {
    return await this.GroupModel.findOneAndUpdate(
      { _id: AddMessagesDto.groupid },
      {
        $addToSet: {
          messages: {
            message: AddMessagesDto.message, senderId: AddMessagesDto.senderid, createdAt: new Date()
            , _id: new Types.ObjectId(),
          }
        }
      },
      { new: true }
    )
  }
  async likeMessage(likeMessagesDto: LikeMessagesDto): Promise<GroupDocument> {
    return this.GroupModel.findOneAndUpdate(
      { _id: likeMessagesDto.groupid, 'messages._id': new Types.ObjectId(likeMessagesDto.messageid) },
      { $addToSet: { 'messages.$.like': new Types.ObjectId(likeMessagesDto.userid) } }, 
      { new: true }
    )
  }
  async searchGroup(SearchGroupDto: SearchGroupDto): Promise<GroupDocument[]> {



    const textSearchResults = await this.GroupModel.aggregate([
      {
        $search: {
          index: 'searchGroup',
          text: {
            query: SearchGroupDto.groupName,
            path: {
              wildcard: '*',
            },
            fuzzy: { maxEdits: 2, prefixLength: 3, maxExpansions: 256 },
          },
        },
      },
      {
        $project: {
          groupname: 1,
          members: 1,
          messages: 1
        },
      },
    ])
    return textSearchResults;
  }
}
