import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe', description: 'The unique username of the user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'The unique email of the user' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  emailId: string;

  @ApiProperty({ example: 'StrongPassword123!', description: 'The user password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}