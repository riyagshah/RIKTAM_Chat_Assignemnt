import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DatabaseModule } from './infra/mongoose/daatabse.module';
import { MongooseModelsModule } from './schema/mongoose-models.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
 
    DatabaseModule,MongooseModelsModule,
    UsersModule,
    AdminModule,
    AuthModule,
    GroupModule,   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
