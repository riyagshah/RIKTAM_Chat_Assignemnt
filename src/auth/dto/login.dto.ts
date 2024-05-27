
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User_Role } from 'src/constants';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'username',
  })
  username: string;
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'password',
  })
  password: string;

 
}