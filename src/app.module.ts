import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Importa todos los módulos de features
import { ClienteModule } from './cliente/cliente.module';
import { ProductoModule } from './producto/producto.module';
import { OrdenModule } from './orden/orden.module';
import { ReservaModule } from './reserva/reserva.module';
import { ComentarioModule } from './comentario/comentario.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'SUSER',
      database: 'xdbd',
      autoLoadEntities: true, // Carga automáticamente 
      synchronize: true,     
    }),
    ClienteModule,
    ProductoModule,
    OrdenModule,
    ReservaModule,
    ComentarioModule,
    AuthModule,
    UsuarioModule,
  ],
})
export class AppModule {}