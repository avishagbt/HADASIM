import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TeachersService } from './teacher.servise';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teacherService: TeachersService) {}
  @Get()
  findAll(): string {
    return this.findAll();
  }
   
  @Get('id/:id')
  findOne(@Param('id') id: string): string {
    return this.findOne(id);
  }

  @Post('teacher')
    create(@Body() createTeacherDto: CreateTeacherDto) {
      return 'This action adds a new user';
    }

}CreateTeacherDto
