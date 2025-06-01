import { IsInt, IsNotEmpty, IsString, MaxLength, Min, Max } from 'class-validator';

export class CreateComentarioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200, { message: 'El texto no puede tener más de 200 caracteres' })
  texto: string;

  @IsInt()
  @Min(1, { message: 'El puntaje mínimo es 1' })
  @Max(5, { message: 'El puntaje máximo es 5' })
  puntaje: number;

  @IsInt()
  productoId: number;
}