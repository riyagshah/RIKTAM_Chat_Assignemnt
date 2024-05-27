
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User_Role } from 'src/constants';

export class CreateAdminDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'username',
  })
  username: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    required: true,
    enum: Object.keys(User_Role)
  })
  role: User_Role;
}