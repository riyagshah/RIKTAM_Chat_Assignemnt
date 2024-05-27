import { Test, TestingModule } from '@nestjs/testing';
import { GroupService } from './group.service';
import { getModelToken } from '@nestjs/mongoose';
import { Group, GroupDocument } from '../schema/group.schema';
import { CreateGroupDto } from './dto/create-group.dto';
import { AddMemberDto } from './dto/addMember.dto';
import { AddMessagesDto } from './dto/add-messages.dto';
import { LikeMessagesDto } from './dto/like-messages.dto';
import { SearchGroupDto } from './dto/search-group.dto';
import { Model } from 'mongoose';

describe('GroupService', () => {
  let service: GroupService;
  let GroupModel: Model<GroupDocument>; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        {
          provide: getModelToken(Group.name),
          useValue: {
            create: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            aggregate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
    GroupModel = module.get<Model<GroupDocument>>(getModelToken(Group.name));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a group', async () => {
    const createGroupDto: CreateGroupDto = {
      groupName: 'groupname',
    };
    const user = { id: '664ecb894c9b6777666840b8' }; 

    const groupData = {
      _id: '444ecb894c9b6777666840b8',
      groupname: createGroupDto.groupName,
      members: [user.id],
    };

    // Mock the req.user object
    const req = { user };

    (GroupModel.create as jest.Mock).mockResolvedValue(groupData);

    const result = await service.create(createGroupDto, req);

    expect(result).toEqual(groupData);
    expect(GroupModel.create).toHaveBeenCalledWith({
      groupname: createGroupDto.groupName,
      members: [user.id],
    });
  });

  // Write similar tests for other methods like addMember, deleteGroupById, addMessage, likeMessage, and searchGroup


  it('should add a member to the group', async () => {
    const addMemberDto: AddMemberDto = {
      groupid: 'GROUP_ID_HERE',
      userid: '664ecb894c9b677766684044',
    };

    const groupData = {
      _id: '444ecb894c9b6777666840b8',
      groupname: 'Test Group',
      members: ['664ecb894c9b6777666840b8', addMemberDto.userid],
    };

    (GroupModel.findOneAndUpdate as jest.Mock).mockResolvedValue(groupData);

    const result = await service.addMember(addMemberDto);

    expect(result).toEqual(groupData);
    expect(GroupModel.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: addMemberDto.groupid },
      { $push: { members: addMemberDto.userid } },
      { new: true }
    );
  });

  it('should delete a group by ID', async () => {
    const groupId = '664ecb894c9b6777666840b8';

    const groupData = {
      _id: groupId,
      groupname: 'Test Group',
      members: ['444ecb894c9b6777666840b8'],
      // Add other group data properties here
    };

    (GroupModel.findByIdAndDelete as jest.Mock).mockResolvedValue(groupData);

    const result = await service.deleteGroupById(groupId);

    expect(result).toEqual(groupData);
    expect(GroupModel.findByIdAndDelete).toHaveBeenCalledWith(groupId);
  });

  it('should add a message to the group', async () => {
    const addMessagesDto: AddMessagesDto = {
      groupid: '664ecb894c9b6777666840b8',
      message: 'Test Message',
      senderid: '664ecb894c9b6777666840b8',
    };

    const groupData = {
      _id: '664ecb894c9b6777666840b8',
      groupname: 'Test Group',
      members: ['444ecb894c9b6777666840b8'],
      messages: [
        {
          _id: '994ecb894c9b6777666840b8',
          message: addMessagesDto.message,
          senderId: addMessagesDto.senderid,
          createdAt: expect.any(Date),
        },
      ],
      // Add other group data properties here
    };

    (GroupModel.findOneAndUpdate as jest.Mock).mockResolvedValue(groupData);

    const result = await service.addMessage(addMessagesDto);

    expect(result).toEqual(groupData);
    expect(GroupModel.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: addMessagesDto.groupid },
      {
        $addToSet: {
          messages: {
            message: addMessagesDto.message,
            senderId: addMessagesDto.senderid,
            createdAt: expect.any(Date),
            _id: expect.anything(), // Mock ObjectId creation
          },
        },
      },
      { new: true }
    );
  });

//   it('should like a message in the group', async () => {
//     const likeMessagesDto: LikeMessagesDto = {
//       groupid: '664ecb894c9b6777666840b8',
//       messageid: '994ecb894c9b6777666840b8',
//       userid: '444ecb894c9b6777666840b8',
//     };

//     const groupData = {
//       _id: '664ecb894c9b6777666840b8',
//       groupname: 'Test Group',
//       members: ['444ecb894c9b6777666840b8'],
//       messages: [
//         {
//           _id: '994ecb894c9b6777666840b8',
//           message: 'Test Message',
//           senderId: '444ecb894c9b6777666840b8',
//           createdAt: expect.any(Date),
//           like: [likeMessagesDto.userid],
//         },
//       ],
//       // Add other group data properties here
//     };

//     (GroupModel.findOneAndUpdate as jest.Mock).mockResolvedValue(groupData);

//     const result = await service.likeMessage(likeMessagesDto);

//     expect(result).toEqual(groupData);
//     expect(GroupModel.findOneAndUpdate).toHaveBeenCalledWith(
//       { _id: likeMessagesDto.groupid, 'messages._id': likeMessagesDto.messageid },
//       { $addToSet: { 'messages.$.like': likeMessagesDto.userid } },
//       { new: true }
//     );
//   });

  it('should search groups', async () => {
    const searchGroupDto: SearchGroupDto = {
      groupName: 'Test',
    };

    const searchResults = [
      {
        _id: '664ecb894c9b6777666840b8',
        groupname: 'Test Group',
        members: ['444ecb894c9b6777666840b8'],
        messages: [],
        // Add other group data properties here
      },
    ];

    (GroupModel.aggregate as jest.Mock).mockResolvedValue(searchResults);

    const result = await service.searchGroup(searchGroupDto);

    expect(result).toEqual(searchResults);
    expect(GroupModel.aggregate).toHaveBeenCalledWith([
      {
        $search: {
          index: 'searchGroup',
          text: {
            query: searchGroupDto.groupName,
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
          messages: 1,
        },
      },
    ]);
  });
});
