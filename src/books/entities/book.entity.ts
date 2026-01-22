import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity() // This tells TypeORM to create a table named 'book'
export class Book {
  @PrimaryGeneratedColumn() // Auto-incrementing ID
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ unique: true }) // No two books can have the same ISBN
  isbn: string;

  @Column({ default: true }) // Default status is available
  isAvailable: boolean;

  @ManyToOne(() => User, (user) => user.books, { onDelete: 'SET NULL' })
  user: User;

  @Column({ nullable: true })
  userId: number;
}