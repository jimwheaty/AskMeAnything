import { Answer } from 'src/answer/answer.model';
import { Question } from 'src/question/question.model';
import { Tag } from 'src/tags/tags.model';
export declare class StatsService {
    private readonly tagModel;
    private readonly questionModel;
    private readonly answerModel;
    constructor(tagModel: typeof Tag, questionModel: typeof Question, answerModel: typeof Answer);
    getQuestionsByDate(userId: string, year: string, month: string): Promise<Question[]>;
    getAnswersByDate(userId: string, year: string, month: string): Promise<Answer[]>;
    getPopularTags(limit: string): Promise<Tag[]>;
}
