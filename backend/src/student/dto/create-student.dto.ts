import { IsNumber, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsNumber()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  grade: string;
}
