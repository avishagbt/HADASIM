import { Module } from '@nestjs/common';
import { StudentsModule } from './student/student.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { student } from './student/student.entity';
import { teacher } from './teacher/teacher.entity';
import { TeachersModule } from './teacher/teacher.module';
import { AuthModule } from './auth/auth.module';
import { LocationModule } from './location/location/location.module';

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
    }), StudentsModule,TeachersModule, AuthModule, LocationModule],
})
export class AppModule {
}
