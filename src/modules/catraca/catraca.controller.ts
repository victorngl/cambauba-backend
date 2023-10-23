import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CatracaService } from './catraca.service';
import { CatracaMessageDto } from './dto/catraca-sendmessage.dto';
import { ApiTags } from '@nestjs/swagger';
import { AgendaeduService } from '../agendaedu/agendaedu.service';
import { AgendaEduNotificationService } from '../notifications/agendaedu-notification.service';
import { IAgendaEduNotification } from '../notifications/interfaces/notifications.interface';


@ApiTags('Catraca')
@Controller('catraca')
export class CatracaController {
  constructor(private readonly agendaeduService: AgendaeduService, private readonly agendaeduNotification: AgendaEduNotificationService) { }

  @Post('move')
  @HttpCode(200)
  async sendCatracaMessage(@Body() catracaMessageDto: CatracaMessageDto) {

    //VERIFICAR SE O SCHEDULE ESTA NO PADRÃO EXIGIDO
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

    if (!regex.test(catracaMessageDto.schedule)) {
      throw new HttpException("Formato do horário inválido.", HttpStatus.NOT_FOUND);

    }

    //VERIFICA SE O TIPO É IN OU OUT
    if (catracaMessageDto.type !== 'IN' && catracaMessageDto.type !== 'OUT') {
      throw new HttpException("Tipo de movimento inválido, ele pode ser do tipo IN ou OUT", HttpStatus.NOT_FOUND);
    }

    //OBTENCAO DO TOKEN BEARER DA AGENDA EDU
    const agendaEduBearerToken = await this.agendaeduService.getAgendaEduBearerToken();

    const typeMoveTitle = (catracaMessageDto.type == 'IN') ? 'Entrada de Aluno' : 'Saída de Aluno';
    const typeMoveDescription = (catracaMessageDto.type == 'IN') ? ' entrou na Escola às ' : ' saiu da Escola às ';
    const [dateMove, timeMove] = catracaMessageDto.schedule.split(' ')

    const descriptionMessage = "O aluno " + catracaMessageDto.studentName + typeMoveDescription + timeMove + ' em ' + dateMove + '.';

    const messageData: IAgendaEduNotification = {
      "notification": {
        student_external_id: catracaMessageDto.studentId,
        student_can_see: true,
        send_to_all_responsibles: true,
        category: "gate",
        send_at: catracaMessageDto.schedule,
        title: typeMoveTitle,
        description: descriptionMessage,
        from: 'Catraca EMC'
      }
    }

    console.log(messageData)

    return await this.agendaeduNotification.send(messageData, agendaEduBearerToken);
  }
}
