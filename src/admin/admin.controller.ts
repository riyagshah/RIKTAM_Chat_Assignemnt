import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/createUser..dto';
import { AuthGuard } from '../AuthGuard/AuthGuard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/UpdateUserDto';


@Controller('admin')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
@ApiTags('Admin')

export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('createUser')
  create(@Body() CreateUserDto: CreateUserDto) {
    return this.adminService.create(CreateUserDto);
  }

  @Patch("updateUser")
  updateUser(
    @Body() updateChatDto: UpdateUserDto,
  ) {

    return this.adminService.updateUser(updateChatDto);
  }

}
