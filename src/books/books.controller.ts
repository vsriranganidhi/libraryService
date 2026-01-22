import { Controller, Get, Post, Body, Patch, Param, Delete ,ParseIntPipe} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BorrowBookDto } from './dto/borrow.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id);
  }

  @Patch(':id/borrow')
  async borrow(
    @Param('id', ParseIntPipe) bookId: number, 
    @Body() borrowBookDto: BorrowBookDto // Use the DTO here
  ) {
    return this.booksService.borrowBook(bookId, borrowBookDto.userId);
  }
  
  @Get(':id/history')
  async getUserHistory(@Param('id', ParseIntPipe) userId: number) {
    return this.booksService.getUserHistory(userId);
  }
}
