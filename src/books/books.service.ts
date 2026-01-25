import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { BadRequestException } from '@nestjs/common';
import { BorrowRecord } from './entities/borrowRecord.entity';

@Injectable()
export class BooksService { 
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(BorrowRecord)
    private readonly borrowRecordRepository: Repository<BorrowRecord>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = this.bookRepository.create(createBookDto);
    return await this.bookRepository.save(newBook);
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id); // Reuses the findOne check logic
    const updatedBook = Object.assign(book, updateBookDto);
    return await this.bookRepository.save(updatedBook);
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepository.remove(book);
  }

  async borrowBook(bookId: number, userId: number) {
    const book = await this.bookRepository.findOneBy({ id: bookId });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (!book.isAvailable) {
      throw new BadRequestException('This book is already borrowed by someone else');
    }

    book.userId = userId;
    book.isAvailable = false;

    await this.bookRepository.save(book);

    const record = this.borrowRecordRepository.create({
      user: { id: userId },
      book: { id: bookId }
    });
    return await this.borrowRecordRepository.save(record);
  }

  async getUserHistory(userId: number) {
    return await this.borrowRecordRepository.find({
      where: { user: { id: userId } },
      relations: ['book'], 
      order: { borrowedAt: 'DESC' }
    });
  }
}
