import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';
import { UsersModule } from './users/users.module';
import {User} from './users/entities/user.entity';
import { BorrowRecord } from './books/entities/borrowRecord.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'admin', 
      password: 'password123', 
      database: 'library_service',
      entities: [Book, User, BorrowRecord], 
      synchronize: true,
    }),
    BooksModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
