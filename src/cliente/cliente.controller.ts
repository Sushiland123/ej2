import { Controller, Post, Body } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './cliente.dto';
import { Cliente } from './cliente.entity';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  async create(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
    return this.clienteService.create(createClienteDto);
  }
}