import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { Producto } from '../producto/producto.entity';
import { IsNotEmpty, ArrayNotEmpty, IsNumber } from 'class-validator';

@Entity()
export class Orden {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, { eager: true, nullable: false })
  @IsNotEmpty({ message: 'Debe seleccionar un cliente' })
  cliente: Cliente;

  @ManyToMany(() => Producto, { eager: true })
  @JoinTable()
  @ArrayNotEmpty({ message: 'Debe agregar al menos un producto' })
  productos: Producto[];

  @CreateDateColumn()
  fechaCreacion: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  @IsNumber()
  montoTotal: number;
}