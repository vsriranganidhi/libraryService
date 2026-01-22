import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto'; // You'll need to create this DTO
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  //Register
  async register(createUserDto: CreateUserDto) {
    // Creating the user instance
    const newUser = this.userRepository.create(createUserDto);
    // Saving to PostgreSQL
    return await this.userRepository.save(newUser);
  }

  //Login
  async login(loginDto: LoginDto) {
  // Search for a user where username OR email matches the input
    const { identifier, password } = loginDto;
    const user = await this.userRepository.findOne({
      where: [
        { username: identifier },
        { emailId: identifier }
      ],
    });

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Normally you'd return a JWT here, but for now, we'll return the user
    return { message: 'Login successful', userId: user.id };
  }

  //Logout
  logout() {
    return { message: 'Logged out successfully. Please delete your token on the frontend.' };
  }

  //Delete Account
  async deleteAccount(id: string) {
    const newUser = this.userRepository.delete(id);
    return { message: 'Account deleted successfully' };
  }
}