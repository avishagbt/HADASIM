
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { teacher } from './teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(teacher)
    private usersRepository: Repository<teacher>,
  ) {}

  findAll(): Promise<teacher[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<teacher | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
