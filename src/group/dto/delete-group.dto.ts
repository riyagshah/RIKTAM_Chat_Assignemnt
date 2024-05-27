
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User_Role } from 'src/constants';

export class DeleteGroupDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'groupid',
  })
  id: string;
}