import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getPopularTags(limit: string): Promise<any>;
    getQuestionsByDate(userId: string, year: string, month: string): Promise<any>;
    getAnswersByDate(userId: string, year: string, month: string): Promise<any>;
}
