import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('refresh')
  reautenticar(@Body() body) {
    return this.authService.reauthenticate(body); //este método será implementado abaixo, portanto é esperado que de erro.
  }


}