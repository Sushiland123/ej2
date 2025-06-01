import { IsNotEmpty, ArrayNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrdenDto {
  @IsNotEmpty({ message: 'Debe seleccionar un cliente' })
  clienteId: number;

  @ArrayNotEmpty({ message: 'Debe agregar al menos un producto' })
  productosIds: number[];

  // El montoTotal normalmente se calcula automáticamente, pero lo incluimos aquí si se recibe por DTO
  @IsNumber()
  @IsPositive()
  montoTotal: number;
}