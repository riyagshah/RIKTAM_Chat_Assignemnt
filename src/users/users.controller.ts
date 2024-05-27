import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateAdminDto } from './dto/createUser..dto';
import { AuthGuard } from '../AuthGuard/AuthGuard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../schema/auth.schema';


@Controller('users')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get(':userid')
  async findById(@Param('userid') id: string): Promise<any> {

    const result = await this.usersService.findWithId(id);
    if (!result) {
      return {
        message: 'User not found with this userid '
      }
    }
    return result;

  }
  @Get('User/:username')
  async findOne(@Param('username') id: string): Promise<any> {
    const result = await this.usersService.findByUsername(id);
    if (!result) {
      return {
        message: 'Username not found '
      }
    }

    return result;

  }

}