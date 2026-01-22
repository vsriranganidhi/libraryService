import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';
import { BorrowRecord } from './entities/borrowRecord.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BorrowRecord])], // Registering the Book entity
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}