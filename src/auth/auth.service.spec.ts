import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Auth, AuthDocument } from '../schema/auth.schema';
import { LoginDto } from './dto/login.dto';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let AuthModel: any; // Change the type according to your model

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getModelToken(Auth.name),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    AuthModel = module.get(getModelToken(Auth.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate token for valid login', async () => {
    const loginDto: LoginDto = {
      username: 'username',
      password: 'password',
    };
    const userDetail = {
      _id: '664ecb894c9b6777666840b8',
      username: 'username',
      // Add other user data properties here
    };

    // Mock the behavior of the AuthModel.findOne method
    (AuthModel.findOne as jest.Mock).mockResolvedValue(userDetail);

    // Mock the behavior of the jwtService.sign method
    const signSpy = jest.spyOn(jwtService, 'sign');
    signSpy.mockReturnValue('123456789');

    const result = await service.generateToken(loginDto);

    expect(result).toBe('123456789');
    expect(AuthModel.findOne).toHaveBeenCalledWith({ username: loginDto.username });
    expect(signSpy).toHaveBeenCalledWith({
      username: loginDto.username,
      password: loginDto.password,
      id: userDetail._id,
    });
  });

  it('should return null for invalid login', async () => {
    const loginDto: LoginDto = {
      username: 'invalid_user',
      password: 'invalid_password',
    };

    // Mock the behavior of the AuthModel.findOne method
    (AuthModel.findOne as jest.Mock).mockResolvedValue(null);

    const result = await service.generateToken(loginDto);

    expect(result).toBeUndefined();
    expect(AuthModel.findOne).toHaveBeenCalledWith({ username: loginDto.username });
  });

  it('should verify token', () => {
    const token = '123456789';
    const decodedToken = {
        username: 'test_user',
        id: '664ecb894c9b6777666840b8',
        // Add other payload properties here
      };
    const verifySpy = jest.spyOn(jwtService, 'verify');
    verifySpy.mockReturnValue(decodedToken);

    const result = service.verifyToken(token);

    expect(result).toBe(decodedToken);
    expect(verifySpy).toHaveBeenCalledWith(token);
  });

  it('should return null for invalid token', () => {
    const token = '1234567899';

    const result = service.verifyToken(token);

    expect(result).toBeNull();
  });
});
