import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiExcludeController } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';

@ApiExcludeController(true)
@Public()
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
    return this.authService.reauthenticate(body);
  }


}