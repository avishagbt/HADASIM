
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  classroom: string;
}
