
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(student)
    private studentRepository: Repository<student>,
    //private dataSource: DataSource
  ) {}

  findAll(){
    return this.studentRepository.find();
  }

  async findAllInGrade(grade: string) {
    return this.studentRepository
      .createQueryBuilder('student')
      .where('student.grade LIKE :grade', { grade: `%${grade}%` })
      .getMany();
  }

  findOne(id: number): Promise<student | null> {
    return this.studentRepository.findOneBy({ id });
  }

  async create(dto: CreateStudentDto) {

  const student = this.studentRepository.create({
    id:dto.id,
    firstName: dto.firstName,
    lastName: dto.lastName,
    grade: dto.grade,
  });

  return this.studentRepository.save(student);
}
}
