import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Producto } from '../producto/producto.entity';
import { IsInt, Min, Max, IsNotEmpty, Length } from 'class-validator';

@Entity()
export class Comentario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'El comentario no puede estar vacío' })
  @Length(1, 200, { message: 'El comentario no puede superar los 200 caracteres' })
  texto: string;

  @Column()
  @IsInt({ message: 'El puntaje debe ser un número entero' })
  @Min(1, { message: 'El puntaje mínimo es 1' })
  @Max(5, { message: 'El puntaje máximo es 5' })
  puntaje: number;

  @ManyToOne(() => Producto, { nullable: false, eager: true })
  producto: Producto;
}