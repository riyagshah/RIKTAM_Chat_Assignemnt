
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User_Role } from 'src/constants';

export class AddMemberDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  userid: string;
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  groupid: string;
}