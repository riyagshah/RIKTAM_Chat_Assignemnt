import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/createUser..dto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Auth, AuthDocument } from '../schema/auth.schema';
import { Model } from 'mongoose';

describe('AdminController', () => {
  let controller: AdminController;
  let adminService: AdminService;
  let jwtService: JwtService;
  let AuthModel: Model<AuthDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService,JwtService,
        {
            provide: getModelToken(Auth.name), // Provide AuthModel dependency
            useValue: {}, // Mock implementation for AuthModel
          },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    adminService = module.get<AdminService>(AdminService);
    jwtService = module.get<JwtService>(JwtService);
    AuthModel = module.get<Model<AuthDocument>>(getModelToken(Auth.name));

  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = { username: 'testuser', password: 'testpassword', role: 'normal' };

      jest.spyOn(adminService, 'create').mockResolvedValue({}as any); // Mock the create method of the adminService

      const result = await controller.create(createUserDto);

      expect(result).toBeDefined();
      expect(adminService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
          current_username: 'oldUsername', username: 'newUsername',
          role: 'normal'
      };

      jest.spyOn(adminService, 'updateUser').mockResolvedValue({} as any ); // Mock the updateUser method of the adminService

      const result = await controller.updateUser(updateUserDto);

      expect(result).toBeDefined();
      expect(adminService.updateUser).toHaveBeenCalledWith(updateUserDto);
    });
  });

});
