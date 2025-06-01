import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './reserva.entity';
import { Cliente } from '../cliente/cliente.entity';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserva, Cliente])
  ],
  providers: [ReservaService],
  controllers: [ReservaController],
})
export class ReservaModule {}