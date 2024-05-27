
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'current_username',
  })
  current_username: string;
  @IsOptional()
  @ApiProperty({
    example: 'updatedusername',
  })
  username: string;
  @IsOptional()
  @ApiProperty({
    example: 'example@gmail.com',
  })
role: string;
}