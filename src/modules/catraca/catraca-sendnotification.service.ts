import { Body, Injectable } from '@nestjs/common';
import { IAgendaEduNotification } from '../notifications/interfaces/notifications.interface';
import { AgendaeduService } from '../agendaedu/agendaedu.service';
import { AgendaEduNotificationService } from '../notifications/agendaedu-notification.service';
import { CatracaMessageDto } from './dto/catraca-sendmessage.dto';

@Injectable()
export class CatracaServiceSendNotification {
  constructor(private readonly agendaeduService: AgendaeduService, private readonly agendaeduNotification: AgendaEduNotificationService) { }

  async sendCatracaMessage(@Body() catracaMessageDto: CatracaMessageDto) {

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

    return await this.agendaeduNotification.send(messageData, agendaEduBearerToken);
  }
}
