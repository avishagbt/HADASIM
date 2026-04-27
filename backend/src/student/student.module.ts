
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from './student.service';
import { StudentsController } from './student.controller';
import { student } from './student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([student])],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports: [TypeOrmModule]
})
export class StudentsModule {}
