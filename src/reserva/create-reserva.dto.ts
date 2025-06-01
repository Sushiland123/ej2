import { IsNotEmpty, IsDateString, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

// Reusar la validación de rango de fechas en el DTO
@ValidatorConstraint({ name: 'dateRangeDto', async: false })
export class DateRangeDtoValidator implements ValidatorConstraintInterface {
  validate(fechaFin: string, args: ValidationArguments) {
    const reserva = args.object as any;
    return reserva.fechaInicio && fechaFin > reserva.fechaInicio;
  }
  defaultMessage(args: ValidationArguments) {
    return 'La fecha de fin debe ser posterior a la fecha de inicio';
  }
}

export class CreateReservaDto {
  @IsNotEmpty({ message: 'Debe seleccionar un cliente' })
  clienteId: number;

  @IsNotEmpty()
  @IsDateString()
  fechaInicio: string;

  @IsNotEmpty()
  @IsDateString()
  @Validate(DateRangeDtoValidator)
  fechaFin: string;
}