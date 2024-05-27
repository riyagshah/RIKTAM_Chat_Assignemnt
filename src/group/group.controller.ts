import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Request, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteGroupDto } from './dto/delete-group.dto';
import { Response } from 'express';
import { AddMemberDto } from './dto/addMember.dto';
import { AddMessagesDto } from './dto/add-messages.dto';
import { AuthGuard } from '../AuthGuard/AuthGuard';
import { LikeMessagesDto } from './dto/like-messages.dto';
import { SearchGroupDto } from './dto/search-group.dto';

@Controller('group')
@ApiTags('Group Chat')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
export class GroupController {
  constructor(private readonly groupService: GroupService) { }

  @Post('createGroup')
  create(@Body() createGroupDto: CreateGroupDto, @Request() req: any) {
    return this.groupService.create(createGroupDto, req);
  }
  @Post('AddMembers')
  AddMember(@Body() addMemberDto: AddMemberDto) {
    return this.groupService.addMember(addMemberDto);
  }
  @Post('AddMessages')
  AddMessages(@Body() AddMessagesDto: AddMessagesDto) {
    return this.groupService.addMessage(AddMessagesDto);
  }

  @Post('LikeMessages')
  LikeMessages(@Body() LikeMessagesDto: LikeMessagesDto) {
    return this.groupService.likeMessage(LikeMessagesDto);
  }
  @Post('SearchGroup')
  SearchGroup(@Body() SearchGroupDto: SearchGroupDto) {
    return this.groupService.searchGroup(SearchGroupDto);
    return true
  }
  @Delete('deleteGroup')
  async deleteGroup(@Body() deleteGroupDto: DeleteGroupDto, @Res() res: Response) {
    // return true
    const group = await this.groupService.deleteGroupById(deleteGroupDto.id);
    if (group) {
      return res.status(200).json({ message: 'Successfully deleted the group' });

    }
  }


}
