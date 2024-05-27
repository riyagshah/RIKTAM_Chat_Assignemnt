
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User_Role } from 'src/constants';

export class CreateGroupDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'groupname1'
  })
  groupName: string;
}