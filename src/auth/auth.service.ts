import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async validateUser(email: string, password: string): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });
    if (!usuario) return null;
    // Puedes usar bcrypt aquí si tus contraseñas están hasheadas
    if (usuario.password === password) return usuario;
    return null;
  }

  async login(email: string, password: string): Promise<string | null> {
    const usuario = await this.validateUser(email, password);
    if (!usuario) return null;
    const payload = { sub: usuario.id, email: usuario.email };
    return this.jwtService.sign(payload);
  }
}