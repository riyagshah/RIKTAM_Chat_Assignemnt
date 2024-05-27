import { Test, TestingModule } from '@nestjs/testing';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { AddMemberDto } from './dto/addMember.dto';
import { Model } from 'mongoose';
import { Group, GroupDocument } from '../schema/group.schema';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { AddMessagesDto } from './dto/add-messages.dto';
import { LikeMessagesDto } from './dto/like-messages.dto';
import { SearchGroupDto } from './dto/search-group.dto';
import { DeleteGroupDto } from './dto/delete-group.dto';
import { AuthDocument } from 'src/schema/auth.schema';

describe('GroupController', () => {
  let controller: GroupController;
  let groupService: GroupService;
  let GroupModel: Model<GroupDocument>;
  let jwtService: JwtService;
  let AuthModel: Model<AuthDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupController],
      providers: [GroupService,
        JwtService,
      {
        provide: getModelToken(Group.name), // Provide AuthModel dependency
        useValue: {}, // Mock implementation for AuthModel 
    },
]
    }).compile();

    controller = module.get<GroupController>(GroupController);
    groupService = module.get<GroupService>(GroupService);
    GroupModel= module.get<Model<GroupDocument>>(getModelToken(Group.name));
    jwtService = module.get<JwtService>(JwtService);

  });

  describe('create', () => {
    it('should create a new group', async () => {
      const createGroupDto: CreateGroupDto = { groupName: 'Test Group' };
      const req = {}; // Mock request object

      jest.spyOn(groupService, 'create').mockResolvedValue({}as any); // Mock the create method of the groupService

      const result = await controller.create(createGroupDto, req);

      expect(result).toBeDefined();
      expect(groupService.create).toHaveBeenCalledWith(createGroupDto, req);
    });
  });

  describe('AddMember', () => {
    it('should add a member to the group', async () => {
      const addMemberDto: AddMemberDto = { groupid: 'groupId', userid: 'userId' };

      jest.spyOn(groupService, 'addMember').mockResolvedValue({} as any); // Mock the addMember method of the groupService

      const result = await controller.AddMember(addMemberDto);

      expect(result).toBeDefined();
      expect(groupService.addMember).toHaveBeenCalledWith(addMemberDto);
    });
  });

  describe('AddMessages', () => {
    it('should add messages to the group', async () => {
      const addMessagesDto: AddMessagesDto = { groupid: 'groupId', message: 'Test Message', senderid: 'senderId' };

      jest.spyOn(groupService, 'addMessage').mockResolvedValue({}); // Mock the addMessage method of the groupService

      const result = await controller.AddMessages(addMessagesDto);

      expect(result).toBeDefined();
      expect(groupService.addMessage).toHaveBeenCalledWith(addMessagesDto);
    });
  });

  describe('LikeMessages', () => {
    it('should like a message in the group', async () => {
      const likeMessagesDto: LikeMessagesDto = { groupid: 'groupId', messageid: 'messageId', userid: 'userId' };

      jest.spyOn(groupService, 'likeMessage').mockResolvedValue({}as any); // Mock the likeMessage method of the groupService

      const result = await controller.LikeMessages(likeMessagesDto);

      expect(result).toBeDefined();
      expect(groupService.likeMessage).toHaveBeenCalledWith(likeMessagesDto);
    });
  });

  describe('SearchGroup', () => {
    it('should search for a group', async () => {
      const searchGroupDto: SearchGroupDto = { groupName: 'Test Group' };

      jest.spyOn(groupService, 'searchGroup').mockResolvedValue({} as any); // Mock the searchGroup method of the groupService

      const result = await controller.SearchGroup(searchGroupDto);

      expect(result).toBeDefined();
      expect(groupService.searchGroup).toHaveBeenCalledWith(searchGroupDto);
    });
  });

//   describe('deleteGroup', () => {
//     it('should delete a group', async () => {
//       const deleteGroupDto: DeleteGroupDto = { id: 'groupId' };
//       const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//       jest.spyOn(groupService, 'deleteGroupById').mockResolvedValue({}); // Mock the deleteGroupById method of the groupService

//       await controller.deleteGroup(deleteGroupDto, mockResponse as unknown as Response);

//       expect(mockResponse.status).toHaveBeenCalledWith(200);
//       expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Successfully deleted the group' });
//       expect(groupService.deleteGroupById).toHaveBeenCalledWith(deleteGroupDto.id);
//     });
//   });
});
