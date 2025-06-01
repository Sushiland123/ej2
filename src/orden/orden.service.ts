import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orden } from './orden.entity';
import { Cliente } from '../cliente/cliente.entity';
import { Producto } from '../producto/producto.entity';
import { CreateOrdenDto } from './create-orden.dto';

@Injectable()
export class OrdenService {
  constructor(
    @InjectRepository(Orden)
    private readonly ordenRepository: Repository<Orden>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(createOrdenDto: CreateOrdenDto): Promise<Orden> {
    const cliente = await this.clienteRepository.findOne({ where: { id: createOrdenDto.clienteId } });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    if (!createOrdenDto.productosIds || createOrdenDto.productosIds.length === 0) {
      throw new BadRequestException('Debe agregar al menos un producto');
    }

    const productos = await this.productoRepository.findByIds(createOrdenDto.productosIds);
    if (productos.length !== createOrdenDto.productosIds.length) {
      throw new NotFoundException('Uno o más productos no existen');
    }

    // Calcular el monto total sumando los precios de los productos
    const montoTotal = productos.reduce((total, prod) => total + Number(prod.precio), 0);

    const orden = this.ordenRepository.create({
      cliente,
      productos,
      montoTotal,
    });

    return this.ordenRepository.save(orden);
  }
}