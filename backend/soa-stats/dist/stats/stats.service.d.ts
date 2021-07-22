import { ClientProxy } from '@nestjs/microservices';
export declare class StatsService {
    private readonly statsClient;
    constructor(statsClient: ClientProxy);
    getPopularTags(limit: any): Promise<any>;
    getQuestionsByDate(userId: any, year: any, month: any): Promise<any>;
    getAnswersByDate(userId: any, year: any, month: any): Promise<any>;
}
