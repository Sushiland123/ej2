import { IsNotEmpty, IsString, IsNumber, Min, IsInt } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsNumber()
  @Min(0.01, { message: 'El precio debe ser mayor a 0' })
  precio: number;

  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock debe ser un número entero positivo' })
  stock: number;
}