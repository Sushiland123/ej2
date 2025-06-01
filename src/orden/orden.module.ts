import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orden } from './orden.entity';
import { Cliente } from '../cliente/cliente.entity';
import { Producto } from '../producto/producto.entity';
import { OrdenService } from './orden.service';
import { OrdenController } from './orden.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orden, Cliente, Producto])
  ],
  providers: [OrdenService],
  controllers: [OrdenController],
})
export class OrdenModule {}