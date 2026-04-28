
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StudentsService } from '../student/student.service';
import { TeachersService } from '../teacher/teacher.servise'


@Injectable()
export class AuthService {
  constructor(private readonly studentsService: StudentsService,
              private readonly teachersService: TeachersService
            ) {}

  async signIn( id: number): Promise<any> {
    const student = await this.studentsService.findOne(id);
    if (student) {
      return{
        id: student.id,
        type: 'student'
      }
    }
    const teacher = await this.teachersService.findOne(id);
    if (teacher) {
      return{
        id: teacher.id,
        type: 'teacher'
      }
    }
    throw new UnauthorizedException('מספר הזהות אינו קיים במערכת');
  }
}
