import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { IAgendaEduBearerTokenRequest, IAgendaEduBearerTokenResponse } from './interfaces/agendaedu-bearertoken.interface';

@Injectable()
export class AgendaeduService {
    constructor(private readonly httpService: HttpService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {

    }

    async getAgendaEduBearerToken(): Promise<string> {
        let agendaEduBearerToken: string | null = await this.cacheManager.get('AGENDAEDU_BEARER');

        if (!agendaEduBearerToken) {
            const responseAgendaEdu = await this.generateBearerToken();

            if (responseAgendaEdu === null) {
                throw new HttpException("Erro ao gerar token Bearer Agenda Edu", HttpStatus.NOT_FOUND);
            }

            await this.cacheManager.set('AGENDAEDU_BEARER', responseAgendaEdu.access_token, (responseAgendaEdu.expires_in * 1000) - 1000)

            agendaEduBearerToken = responseAgendaEdu.access_token
        }

        return agendaEduBearerToken;
    }

    async generateBearerToken(): Promise<IAgendaEduBearerTokenResponse> {

        const data: IAgendaEduBearerTokenRequest = {
            grant_type: "client_credentials",
            client_id: process.env.AGENDAEDU_CLIENT_ID,
            client_secret: process.env.AGENDAEDU_SECRET_KEY
        };

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        try {
            const getBearerTokenReq = await lastValueFrom(await this.httpService.post("https://api.agendaedu.com/oauth/v2/token", data, {
                headers: headers
            }))

            const respondeGetBearerToken = getBearerTokenReq.data;

            if (getBearerTokenReq.status === 200) {
                return respondeGetBearerToken
            }
            else {
                throw new HttpException('Não foi possível gerar o Agenda Edu Bearer Token.', HttpStatus.INTERNAL_SERVER_ERROR);
            }

        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
