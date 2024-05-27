import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtService } from '@nestjs/jwt';
import { AdminMiddleware } from './middleware/AdminMiddleware';
import { AuthGuard } from 'src/AuthGuard/AuthGuard';
import { CustomAuthMiddleware } from './middleware/CustomMiddleware';
import { MongooseModelsModule } from 'src/schema/mongoose-models.module';
import { UniqueUsernameMiddleware } from './middleware/UniqueUsername.Middleware';
import { UsersService } from 'src/users/users.service';

@Module({

  controllers: [AdminController],
  providers: [AuthGuard,AdminService,JwtService,UsersService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomAuthMiddleware)
    .forRoutes('Admin');
    consumer.apply(AdminMiddleware).forRoutes('Admin');
    consumer.apply(UniqueUsernameMiddleware).forRoutes('Admin/createUser')
    
  
  }
}