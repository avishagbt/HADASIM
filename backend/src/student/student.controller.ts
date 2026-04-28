import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentsService } from './student.service';
import { student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('student')
export class StudentsController {

  constructor(private readonly studentService: StudentsService){}
  @Get()
  findAll(): Promise<student[]> {
    return this.studentService.findAll();
  }

  @Get('grade/:grade')
  findAllInGrade(@Param('grade') grade:string): Promise<student[]> {
    return this.studentService.findAllInGrade(grade);
  }
  
  @Get(':id')
  findOne(@Param('id') id:number): Promise<student | null> {
    return this.studentService.findOne(id);
  }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

}
