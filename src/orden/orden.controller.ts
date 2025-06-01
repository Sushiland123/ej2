import { Controller, Post, Body } from '@nestjs/common';
import { OrdenService } from './orden.service';
import { CreateOrdenDto } from './create-orden.dto';
import { Orden } from './orden.entity';

@Controller('ordenes')
export class OrdenController {
  constructor(private readonly ordenService: OrdenService) {}

  @Post()
  async create(@Body() createOrdenDto: CreateOrdenDto): Promise<Orden> {
    return this.ordenService.create(createOrdenDto);
  }
}