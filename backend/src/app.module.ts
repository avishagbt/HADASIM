import { Module } from '@nestjs/common';
import { StudentsModule } from './student/student.module';
import { StudentsController } from './student/student.controller';
import { TeachersController } from './teacher/teacher.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import { student } from './student/student.entity';
import { teacher } from './teacher/teacher.entity';
import { DataSource } from 'typeorm';
import { StudentsService } from './student/student.service';
import { TeachersService } from './teacher/teacher.servise';
import { TeachersModule } from './teacher/teacher.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1324',
      database: 'HADASIM',
      entities: [student, teacher],
      synchronize: true,
    }), StudentsModule,TeachersModule, AuthModule],
  //controllers: [StudentsController, TeachersController, AuthController],
  //providers: [StudentsService,TeachersService, AuthService]
})
export class AppModule {
}
