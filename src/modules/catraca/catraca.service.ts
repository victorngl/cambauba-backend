import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CatracaMessageDto } from './dto/catraca-sendmessage.dto';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'

@Injectable()

export class CatracaService {
  constructor(private readonly httpService: HttpService, @Inject(CACHE_MANAGER) private cacheManager: Cache) { }
  async sendNotificationToAgendaEdu(catracaMessageDto: CatracaMessageDto, agendaEduBearerToken: string): Promise<object | null> {

    
    const [date, time] = catracaMessageDto.schedule.split(' ');

    const data = {
      notification: {
        student_external_id: catracaMessageDto.studentId,
        student_can_see: true,
        send_to_all_responsibles: true,
        category: "gate",
        send_at: "2022-10-11 14:56:00",
        title: "Entrada e Saída",
        description: "O aluno " + catracaMessageDto.studentName + (catracaMessageDto.type === 'IN' ? " entrou na" : " saiu da") + " Escola às " + time + " em " + date + ".",
        from: "Catraca EMC"
      }
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + agendaEduBearerToken,
      'x-school-token': process.env.AGENDAEDU_SCHOOL_ID,
    };
    
    
    try {
      
      const getResponseNotification = await this.httpService.post("https://api.agendaedu.com/v2/notification", data, {
        headers: headers
      }).toPromise()

      const responseNotificationData = getResponseNotification.data;

      if (responseNotificationData.status === 200) {
        return { message: 'Notificação enviada com sucesso.'}
      }
      else if(responseNotificationData.status === 401) {
        throw new HttpException('Erro ao enviar notificação', HttpStatus.UNAUTHORIZED);
      }
      else if(responseNotificationData.status === 422) {
        throw new HttpException('Erro no servidor Agenda Edu', HttpStatus.BAD_GATEWAY);
      }
      else {
        console.log(responseNotificationData);
        return null
      }

    }
    catch (error) {
      throw new HttpException('error.message', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  saveMoveOnDb(): boolean {
    return false;
  }

  async generateAgendaEduBearerToken() {
    const data = {
      grant_type: "client_credentials",
      client_id: process.env.AGENDAEDU_CLIENT_ID,
      client_secret: process.env.AGENDAEDU_SECRET_KEY
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      const getBearerTokenReq = await this.httpService.post("https://api.agendaedu.com/oauth/v2/token", data, {
        headers: headers
      }).toPromise()

      const respondeGetBearerToken = getBearerTokenReq.data;

      if (getBearerTokenReq.status === 200) {
        return respondeGetBearerToken
      }
      else {
        return null
      }

    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
}
