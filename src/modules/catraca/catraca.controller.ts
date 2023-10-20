import { Body, Controller, HttpCode, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { CatracaService } from './catraca.service';
import { CatracaMessageDto } from './dto/catraca-sendmessage.dto';
import { ApiTags } from '@nestjs/swagger';
import { AgendaeduService } from '../agendaedu/agendaedu.service';


@ApiTags('Catraca')
@Controller('catraca')
export class CatracaController {
  constructor(private readonly catracaService: CatracaService, private readonly agendaeduService: AgendaeduService) {}

  @Post('move')
  @HttpCode(200)
  async sendCatracaMessage(@Body() catracaMessageDto: CatracaMessageDto) {
    
    //VERIFICAR SE O SCHEDULE ESTA NO PADRÃO EXIGIDO
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

    if(!regex.test(catracaMessageDto.schedule)) {
      throw new HttpException("Formato do horário inválido.", HttpStatus.NOT_FOUND);

    }

    //VERIFICA SE O TIPO É IN OU OUT
    if(catracaMessageDto.type !== 'IN' && catracaMessageDto.type !== 'OUT') {
      throw new HttpException("Tipo de movimento inválido, ele pode ser do tipo IN ou OUT", HttpStatus.NOT_FOUND);
    }

    //OBTENCAO DO TOKEN BEARER DA AGENDA EDU
    const agendaEduBearerToken = await this.agendaeduService.getAgendaEduBearerToken();

    return await this.catracaService.sendNotificationToAgendaEdu(catracaMessageDto, agendaEduBearerToken);
  }
}
