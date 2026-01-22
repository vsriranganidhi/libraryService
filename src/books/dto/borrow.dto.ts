import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class BorrowBookDto {
  @ApiProperty({ example: 1, description: 'The ID of the user borrowing the book' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}