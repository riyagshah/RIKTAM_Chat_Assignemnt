
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class LikeMessagesDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  userid: string;
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  messageid: string;
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  groupid: string;
  
}