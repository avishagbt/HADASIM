
import { student } from 'src/student/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  classroom: string;

  //@OneToMany(type => student, Student => Student.id)
  //students: student[];
}
