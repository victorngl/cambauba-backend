import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class NotificationsService {
    abstract send(...args: any[]): Promise<any>;
}

