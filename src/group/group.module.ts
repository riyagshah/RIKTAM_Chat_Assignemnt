import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { GroupValidityMiddleware } from './middleware/GoupValidty.middleware';
import { GroupUsernameValidityMiddleware } from './middleware/GroupUsernameValidity.middleware';
import { AuthGuard } from 'src/AuthGuard/AuthGuard';
import { JwtService } from '@nestjs/jwt';
import { CustomAuthMiddleware } from 'src/admin/middleware/CustomMiddleware';
import { MemberCheckMiddleware } from './middleware/MemberCheck.middleware';
import { AddMessagesValidityMiddleware } from './middleware/AddMessagesValidity.middleware';

@Module({
  controllers: [GroupController],
  providers: [GroupService, AuthGuard, JwtService],
})

export class GroupModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomAuthMiddleware)
    .forRoutes('Group');
    consumer.apply(GroupValidityMiddleware).forRoutes('Group/deleteGroup');
    consumer.apply(GroupUsernameValidityMiddleware).forRoutes('Group/createGroup')
  
    consumer.apply(MemberCheckMiddleware).forRoutes('Group/AddMembers')
    consumer.apply(AddMessagesValidityMiddleware).forRoutes('Group/AddMessages')


  }
}

