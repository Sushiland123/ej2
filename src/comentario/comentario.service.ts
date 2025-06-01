import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comentario } from './comentario.entity';
import { Producto } from '../producto/producto.entity';
import { CreateComentarioDto } from './create-comentario.dto';

@Injectable()
export class ComentarioService {
  constructor(
    @InjectRepository(Comentario)
    private readonly comentarioRepository: Repository<Comentario>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    const producto = await this.productoRepository.findOne({ where: { id: createComentarioDto.productoId } });
    if (!producto) throw new NotFoundException('Producto no encontrado');

    const comentario = this.comentarioRepository.create({
      texto: createComentarioDto.texto,
      puntaje: createComentarioDto.puntaje,
      producto,
    });

    return this.comentarioRepository.save(comentario);
  }
}