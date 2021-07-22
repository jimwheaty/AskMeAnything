import { Question } from 'src/question/question.model';
import { Answer } from './answer.model';
export declare class AnswerService {
    private answerModel;
    private questionModel;
    constructor(answerModel: typeof Answer, questionModel: typeof Question);
    create(newAnswer: Answer): Promise<Answer>;
    findAll(): Promise<Answer[]>;
    findPerUser(userId: number, limit: string): Promise<Answer[]>;
    findPerQuestion(questionId: number): Promise<Question>;
    findOne(id: number): Promise<Answer>;
    update(id: number, answerUpdate: Answer): Promise<Answer>;
    remove(id: number): Promise<void>;
    getAnswersByDate(userId: string, year: string, month: string): Promise<Answer[]>;
}
