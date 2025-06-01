import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { IsDate, IsNotEmpty, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'dateRange', async: false })
export class DateRangeValidator implements ValidatorConstraintInterface {
  validate(fechaFin: Date, args: ValidationArguments) {
    const reserva = args.object as any;
    return reserva.fechaInicio && fechaFin > reserva.fechaInicio;
  }
  defaultMessage(args: ValidationArguments) {
    return 'La fecha de fin debe ser posterior a la fecha de inicio';
  }
}

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, { eager: true, nullable: false })
  @IsNotEmpty({ message: 'Debe seleccionar un cliente' })
  cliente: Cliente;

  @Column({ type: 'date' })
  @IsNotEmpty()
  @IsDate()
  fechaInicio: Date;

  @Column({ type: 'date' })
  @IsNotEmpty()
  @IsDate()
  @Validate(DateRangeValidator)
  fechaFin: Date;
}