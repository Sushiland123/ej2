import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email no puede estar vacío' })
  email: string;
}