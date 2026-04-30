import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class teacher {
  @PrimaryColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  grade: string;

}
