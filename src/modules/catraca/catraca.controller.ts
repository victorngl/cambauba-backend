import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CatracaMessageDto } from './dto/catraca-sendmessage.dto';
import { ApiTags } from '@nestjs/swagger';
import { Permissions } from '../auth/permissions/permissions.decorator';
import { CatracaServiceSendNotification } from './catraca-sendnotification.service';
import { CatracaServiceMove } from './catraca-move.service';


@ApiTags('Catraca')
@Controller('catraca')
export class CatracaController {
  constructor(private readonly catracaServiceNotification: CatracaServiceSendNotification, private readonly catracaMoveGateSave: CatracaServiceMove) { }

  @Post('move')
  @HttpCode(200)
  @Permissions(['agendaedu-send-notification'])
  async catracaMoveHandler(@Body() catracaMessageDto: CatracaMessageDto) {

    //VERIFICAR SE O SCHEDULE ESTA NO PADRÃO EXIGIDO
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

    if (!regex.test(catracaMessageDto.schedule)) {
      throw new HttpException("Formato do horário inválido.", HttpStatus.NOT_FOUND);
    }

    //VERIFICA SE O TIPO É IN OU OUT
    if (catracaMessageDto.type !== 'IN' && catracaMessageDto.type !== 'OUT') {
      throw new HttpException("Tipo de movimento inválido, ele pode ser do tipo IN ou OUT", HttpStatus.NOT_FOUND);
    }

    this.catracaMoveGateSave.save(catracaMessageDto);

    const notification = await this.catracaServiceNotification.sendCatracaMessage(catracaMessageDto);

    return notification;
  }

}
