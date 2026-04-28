import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TeachersService } from './teacher.servise';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { teacher } from './teacher.entity';

@Controller('teacher')
export class TeachersController {
  constructor(private readonly teacherService: TeachersService) {}
  @Get()
  findAll():Promise<teacher[]> {
    return this.teacherService.findAll();
  }
   
  @Get(':id')
  findOne(@Param('id') id: number) : Promise<teacher | null> {
    return this.teacherService.findOne(id);
  }

  @Post()
    create(@Body() createTeacherDto: CreateTeacherDto) {
      return this.teacherService.create(createTeacherDto);
    }
}
