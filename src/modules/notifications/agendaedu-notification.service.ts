import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { IAgendaEduNotification } from './interfaces/notifications.interface';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AgendaEduNotificationService implements NotificationsService
 {
    constructor(private readonly httpService: HttpService) {}

    async send(dataMessage: IAgendaEduNotification, agendaEduBearerToken: string)  {

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + agendaEduBearerToken,
            'x-school-token': process.env.AGENDAEDU_SCHOOL_ID,
        };

        try {
            //const getResponseNotification = await lastValueFrom(await this.httpService.post("https://api.agendaedu.com/v2/notifications", dataMessage, {
            //    headers: headers
            //}))

            const getResponseNotification = { status: 200 };

            if (getResponseNotification.status === 200) {
                return { status: 'OK', message: 'Notificação enviada com sucesso.'}
            }
            else if (getResponseNotification.status === 401) {
                throw new HttpException('Erro ao enviar notificação', HttpStatus.UNAUTHORIZED);
            }
            else if (getResponseNotification.status === 403) {
                throw new HttpException('Você não tem permissão para executar esse operação', HttpStatus.UNAUTHORIZED);
            }
            else if (getResponseNotification.status === 422) {
                throw new HttpException('Erro no servidor Agenda Edu', HttpStatus.BAD_GATEWAY);
            }

        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return { error: 'Erro desconhecido.'};
    }
}

