import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, Min, IsInt } from 'class-validator';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @IsNumber()
  @Min(0.01, { message: 'El precio debe ser mayor a 0' })
  precio: number;

  @Column('int')
  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock debe ser un número entero positivo' })
  stock: number;
}