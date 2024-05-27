import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from '../schema/auth.schema';
import { AuthGuard } from '../AuthGuard/AuthGuard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')

export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() user: LoginDto): Promise<any> {
    const token = await this.authService.generateToken(user);
    return token
  }

  @Post('signout')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  async signout(@Req() req: Request) {

    return { message: 'Signout successful' };
  }
}
