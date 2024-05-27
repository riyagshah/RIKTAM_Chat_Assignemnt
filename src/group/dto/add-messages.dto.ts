
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddMessagesDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  senderid: string;
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  groupid: string;
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example:'Hi this is the new message'
  })
  message: string;
}