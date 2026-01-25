import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';
import { UsersModule } from './users/users.module';
import {User} from './users/entities/user.entity';
import { BorrowRecord } from './books/entities/borrowRecord.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // As we discussed, keep this false for safety!
      }),
    }),
    BooksModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes variables available everywhere
      envFilePath: '.env', // Points to your secret file
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
