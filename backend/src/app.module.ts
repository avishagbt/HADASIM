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
    }), StudentsModule,TeachersModule],
  controllers: [StudentsController, TeachersController],
  providers: [StudentsService,TeachersService]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
