
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StudentsModule } from '../student/student.module';
import { TeachersModule } from '../teacher/teacher.module';
import { StudentsService } from 'src/student/student.service';
import { TeachersService } from 'src/teacher/teacher.servise';


@Module({
  imports: [StudentsModule,TeachersModule],
  providers: [AuthService, StudentsService,TeachersService],
  controllers: [AuthController],
})
export class AuthModule {}
