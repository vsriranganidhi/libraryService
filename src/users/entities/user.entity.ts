import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Book } from 'src/books/entities/book.entity';  

@Entity() // This tells TypeORM to create a table named 'book'
export class User {
  @PrimaryGeneratedColumn() // Auto-incrementing ID
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  emailId: string;

  @Column() // No two books can have the same ISBN
  password: string;

  @CreateDateColumn()
  createdAt: Date;
  
  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}
