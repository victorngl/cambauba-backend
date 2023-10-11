import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CatracaService } from './catraca.service';
import { CatracaMessageDto } from 'src/dto/catraca/catraca-sendmessage.dto';

@Controller('catraca')
export class CatracaController {
  constructor(private readonly catracaService: CatracaService) {}

  @Post('send')
  @HttpCode(200)
  sendCatracaMessage(@Body() catracaMessageDto: CatracaMessageDto) {
    return this.catracaService.sendMessage(catracaMessageDto);
  }
}
