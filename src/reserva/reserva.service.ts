import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Reserva } from './reserva.entity';
import { Cliente } from '../cliente/cliente.entity';
import { CreateReservaDto } from './create-reserva.dto';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    // Validar cliente
    const cliente = await this.clienteRepository.findOne({ where: { id: createReservaDto.clienteId } });
    if (!cliente) throw new BadRequestException('Cliente no encontrado');

    const fechaInicio = new Date(createReservaDto.fechaInicio);
    const fechaFin = new Date(createReservaDto.fechaFin);

    // Validación de rango de fechas (también validada por class-validator)
    if (fechaFin <= fechaInicio) {
      throw new BadRequestException('La fecha de fin debe ser posterior a la fecha de inicio');
    }

    // Validar solapamiento de reservas para el mismo cliente
    const overlapping = await this.reservaRepository.createQueryBuilder('reserva')
      .where('reserva.clienteId = :clienteId', { clienteId: createReservaDto.clienteId })
      .andWhere('(:inicio BETWEEN reserva.fechaInicio AND reserva.fechaFin OR :fin BETWEEN reserva.fechaInicio AND reserva.fechaFin OR reserva.fechaInicio BETWEEN :inicio AND :fin)', {
        inicio: fechaInicio,
        fin: fechaFin,
      })
      .getOne();

    if (overlapping) {
      throw new BadRequestException('El cliente ya tiene una reserva en ese rango de fechas');
    }

    const reserva = this.reservaRepository.create({
      cliente,
      fechaInicio,
      fechaFin,
    });

    return this.reservaRepository.save(reserva);
  }
}