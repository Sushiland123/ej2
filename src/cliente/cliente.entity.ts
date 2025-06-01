import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
@Unique(['email'])
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @Column()
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email no puede estar vacío' })
  email: string;
}