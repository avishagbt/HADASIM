import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { StudentsService } from './student.service';
import { student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('students')
export class StudentsController {

  constructor(private readonly studentService: StudentsService){}
  @Get()
  findAll(): Promise<student[]> {
    return this.studentService.findAll();
  }

  @Get('grade/:grade')
  findAllInGrade(@Query('grade') grade:string): Promise<student[]> {
    return this.studentService.findAllInGrade(grade);
  }
  
  @Get('id/:id')
  findOne(@Query('id') id:number): Promise<student | null> {
    return this.studentService.findOne(id);
  }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

}
