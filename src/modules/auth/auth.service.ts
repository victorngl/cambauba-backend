import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(email: string, pass: string) {
    const user = await this.usersService.user({ email: email });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email };

    return {
      access_token: await this.tokenGeneretor(payload, '7200s'),
    };
  }

  async tokenGeneretor(payload: { email: string }, timeToExpire: string | null) {

    let secretConfigs;
    secretConfigs = { secret: jwtConstants.secret }

    if(timeToExpire!== null) {
      secretConfigs = { ...secretConfigs, expiresIn: timeToExpire };
    }
    
    const accessToken = await this.jwtService.signAsync(
      { email: payload.email },
      secretConfigs,
    );

    const refreshToken = await this.jwtService.signAsync(
      { email: payload.email },
      secretConfigs,
    );
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async reauthenticate(body) {
    const payload = await this.refreshTokenVerify(body); ////este método também será implementado abaixo
    return this.tokenGeneretor(payload, '7200s');
  }

  private async refreshTokenVerify(body) {
    const refreshToken = body.refresh_token;

    if (!refreshToken) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const decode = this.jwtService.decode(refreshToken);
    
    if(decode === null) {
      throw new HttpException('Token inválido.', HttpStatus.NOT_FOUND);
    }

    const email = decode['email'];

    const user = await this.usersService.user({ email: email });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: jwtConstants.refreshSecret,
      });
      return user;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Assinatura Inválida');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expirado');
      }
      throw new UnauthorizedException(err.name);
    }
    
  }
}