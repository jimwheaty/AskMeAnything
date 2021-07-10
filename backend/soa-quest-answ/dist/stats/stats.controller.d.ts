import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getPopularTags(limit: string): Promise<import("../tags/tags.model").Tag[]>;
    getQuestionsByDate(userId: string, year: string, month: string): Promise<import("../question/question.model").Question[]>;
    getAnswersByDate(userId: string, year: string, month: string): Promise<import("../answer/answer.model").Answer[]>;
}
