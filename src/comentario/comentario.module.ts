import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comentario } from './comentario.entity';
import { Producto } from '../producto/producto.entity';
import { ComentarioService } from './comentario.service';
import { ComentarioController } from './comentario.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comentario, Producto])
  ],
  providers: [ComentarioService],
  controllers: [ComentarioController],
})
export class ComentarioModule {}