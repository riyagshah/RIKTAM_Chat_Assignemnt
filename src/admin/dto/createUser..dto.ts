
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'new_username',
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'normal',
  })
role: string;
@IsNotEmpty()
@ApiProperty({
  required: true,
  example: 'password',
})
password: string;
}