import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CatracaService } from './catraca.service';
import { CatracaMessageDto } from './dto/catraca-sendmessage.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Catraca')
@Controller('catraca')
export class CatracaController {
  constructor(private readonly catracaService: CatracaService) {}

  @Post('move')
  @HttpCode(200)
  sendCatracaMessage(@Body() catracaMessageDto: CatracaMessageDto) {
    return this.catracaService.sendMessage(catracaMessageDto);
  }
}
