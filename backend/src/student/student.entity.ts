
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class student {
  @PrimaryColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  grade: string;
}
