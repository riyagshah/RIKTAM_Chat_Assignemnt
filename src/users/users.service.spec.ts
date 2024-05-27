import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Auth, AuthDocument } from '../schema/auth.schema';
import { Model } from 'mongoose';

describe('UsersService', () => {
  let service: UsersService;
  let AuthModel: Model<AuthDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(Auth.name),
          useValue: {
            findById: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    AuthModel = module.get<Model<AuthDocument>>(getModelToken(Auth.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find user by ID', async () => {
    const userId = '664ecb894c9b6777666840b8';
    const userData = {
      _id: userId,
      username: 'username',
      role:"admin"
      // Add other user data properties here
    };

    // Mock the behavior of the AuthModel.findById method
    (AuthModel.findById as jest.Mock).mockResolvedValue(userData);

    const result = await service.findWithId(userId);
    expect(result).toEqual(userData);
  });

  it('should find user by username', async () => {
    const userId = '664ecb894c9b6777666840b8';
    const username = 'username';

    const userData = {
      _id: userId,
      username: 'username',
      role:"admin"
      // Add other user data properties here
    };

    // Mock the behavior of the AuthModel.findOne method
    (AuthModel.findOne as jest.Mock).mockResolvedValue(userData);

    const result = await service.findByUsername(username);
    expect(result).toEqual(userData);
  });
});
