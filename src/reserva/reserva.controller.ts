import { Controller, Post, Body } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './create-reserva.dto';
import { Reserva } from './reserva.entity';

@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  async create(@Body() createReservaDto: CreateReservaDto): Promise<Reserva> {
    return this.reservaService.create(createReservaDto);
  }
}