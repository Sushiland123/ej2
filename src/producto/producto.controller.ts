import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './create-producto.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get()
  findAll() {
    return this.productoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.create(createProductoDto);
  }
}