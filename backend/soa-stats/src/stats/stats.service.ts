import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class StatsService {

    constructor(
        @Inject('STATS_CLIENT') 
        private readonly statsClient: ClientProxy,
    ) {}

    async getPopularTags(limit): Promise<any> {
        return await this.statsClient.send(
            { role: 'stats', cmd: 'tags' }, 
            { limit } 
        );
    }


    async getQuestionsByDate(userId, year, month): Promise<any> {
        return await this.statsClient.send(
            { role: 'stats', cmd: 'questions' },
            { userId, year, month } 
        );
    }


    async getAnswersByDate(userId, year, month): Promise<any> {
        return await this.statsClient.send(
            { role: 'stats', cmd: 'answers' }, 
            { userId, year, month } 
        );
    }

}
