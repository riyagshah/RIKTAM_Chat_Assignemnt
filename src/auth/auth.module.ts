import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './auth.Strategy';
import { VerifyPasswordMiddleware } from './middleware/verifyPassword.middleware';

@Module({
  imports: [
    JwtModule.register({
      secret: 'BNjr7Bk8dMqhq8N-dJAhI15JOzZR9TLaPKX-CS1L7v-i3PRRlYZzDrI7NrAdw6cN',
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  
    consumer.apply(VerifyPasswordMiddleware).forRoutes('auth/login')
    
  
  }
}