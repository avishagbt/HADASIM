
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { teacher } from './teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(teacher)
    private teacherRepository: Repository<teacher>,
  ) {}

  findAll(): Promise<teacher[]> {
    return this.teacherRepository.find();
  }

  findOne(id: number): Promise<teacher | null> {
    return this.teacherRepository.findOneBy({ id });
  }


  async create(dto: CreateTeacherDto) {
  
    const teacher = this.teacherRepository.create({
      id:dto.id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      grade: dto.grade,
    });
  
    return this.teacherRepository.save(teacher);
  }
}
