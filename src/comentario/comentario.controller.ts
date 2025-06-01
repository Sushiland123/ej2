import { Controller, Post, Body } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { CreateComentarioDto } from './create-comentario.dto';
import { Comentario } from './comentario.entity';

@Controller('comentarios')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) {}

  @Post()
  async create(@Body() createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    return this.comentarioService.create(createComentarioDto);
  }
}