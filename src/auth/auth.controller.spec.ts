import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AppService } from '../app.service';
import { AuthGuard } from '@nestjs/passport';
import { getModelToken } from '@nestjs/mongoose';
import { Auth, AuthDocument } from '../schema/auth.schema';
import { UsersController } from '../users/users.controller';
import { UsersService } from '../users/users.service';
import { Model } from 'mongoose';
import { AuthModule } from './auth.module';
import { AppController } from '../app.controller';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;
    let jwtService: JwtService;
    let AuthModel: Model<AuthDocument>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({

            controllers: [AuthController, AppController, UsersController],
            providers: [
                AppService,
                UsersService,
                JwtService,
                AuthService,
                {
                    provide: getModelToken(Auth.name), // Provide AuthModel dependency
                    useValue: {}, // Mock implementation for AuthModel 
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);

        authService = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService);

        AuthModel = module.get<Model<AuthDocument>>(getModelToken(Auth.name));
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('login', () => {
        it('should return a token', async () => {
            const loginDto: LoginDto = { username: 'testuser', password: 'testpassword' };
            const expectedToken = 'mockedToken';

            jest.spyOn(authService, 'generateToken').mockReturnValue(expectedToken as any);

            const result = await controller.login(loginDto);

            expect(result).toEqual(expectedToken);
            expect(authService.generateToken).toHaveBeenCalledWith(loginDto);
        });
    });

    // Add more test cases for other controller methods if needed

    describe('signout', () => {
        it('should return a signout message', async () => {
            const mockRequest = {};

            const result = await controller.signout(mockRequest as any);
            expect(result).toEqual({ message: 'Signout successful' });
        });
    });
});
