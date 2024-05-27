import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AppController } from '../app.controller';
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';
import { AuthGuard } from '../AuthGuard/AuthGuard';
import { getModelToken } from '@nestjs/mongoose';
import { Auth, AuthDocument } from '../schema/auth.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AppService } from '../app.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;
  let AuthModel: Model<AuthDocument>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController, AppController, AuthController], // Add AppController and AuthController
      providers: [
        AppService,
        UsersService,
        AuthService,
        AuthGuard,
        JwtService,
        {
          provide: getModelToken(Auth.name), // Provide AuthModel dependency
          useValue: {}, // Mock implementation for AuthModel
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);

    AuthModel = module.get<Model<AuthDocument>>(getModelToken(Auth.name));

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('findById', () => {
    it('should return user by ID', async () => {
        const userId = '664ecb894c9b6777666840b8';
        const userData = {
          _id: userId,
          username: 'username',
          role:"admin"
          // Add other user data properties here
        };
        jest.spyOn(usersService, 'findWithId').mockResolvedValue(userData as any);
  
      const result = await controller.findById(userId);
  
      expect(result).toEqual(userData);
    });
  });
  
  describe('findOne', () => {
    it('should return user by username', async () => {
      const username = 'testuser'; // Provide a sample username
      const user = { username: username, /* other user data */ };

      jest.spyOn(usersService, 'findByUsername').mockResolvedValue(user as any);

      const result = await controller.findOne(username);

      expect(result).toEqual(user);
    });
  });
});
