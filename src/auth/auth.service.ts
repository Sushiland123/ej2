import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Aquí deberías validar el usuario contra tu base de datos
  async validateUser(username: string, password: string): Promise<any> {
    // Ejemplo HARDCODEADO: reemplaza por tu lógica real
    if (username === 'admin' && password === 'sushi123') {
      return { userId: 1, username: 'admin' };
    }
    return null;
  }

  async login(username: string, password: string): Promise<string | null> {
    const user = await this.validateUser(username, password);
    if (!user) {
      return null;
    }
    // El payload puede contener lo que quieras incluir en el token (ej: id, username)
    const payload = { username: user.username, sub: user.userId };
    return this.jwtService.sign(payload);
  }
}