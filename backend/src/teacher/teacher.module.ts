
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersController } from './teacher.controller';
import { teacher } from './teacher.entity';
import { TeachersService } from './teacher.servise';


@Module({
  imports: [TypeOrmModule.forFeature([teacher])],
  providers: [TeachersService],
  controllers: [TeachersController],
  exports: [TypeOrmModule]
})
export class TeachersModule {}
