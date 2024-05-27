import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Auth, AuthDocument } from '../schema/auth.schema';
import { Model } from 'mongoose';

describe('AdminService', () => {
  let service: AdminService;
  let jwtService: JwtService;
  let UserModel: Model<AuthDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        JwtService,
        {
          provide: getModelToken(Auth.name),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findByIdAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    jwtService = module.get<JwtService>(JwtService);
    UserModel = module.get<Model<AuthDocument>>(getModelToken(Auth.name));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a user', async () => {
    const updateChatDto = {
      current_username: '12345',
      username: 'testuser',
      role: "normal"
    };

    const user = {
      _id: "664ecb894c9b6777666840b8",
      current_username: '12345', 
      username: 'testuser',
      role: "normal"

    };

    (UserModel.findOne as jest.Mock).mockResolvedValue(user);
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(user); 

    const result = await service.updateUser(updateChatDto);

    expect(result).toEqual(user);
    expect(UserModel.findOne).toHaveBeenCalledWith({ username: updateChatDto.current_username });
    expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(user._id, { $set: updateChatDto }, { new: true });
  });
});
