import { AnswerService } from './answer.service';
import { Answer } from './answer.model';
export declare class AnswerController {
    private readonly answerService;
    constructor(answerService: AnswerService);
    create(newAnswer: Answer, req: any): Promise<Answer>;
    findAll(): Promise<Answer[]>;
    findPerUser(userId: number, limit: string): Promise<Answer[]>;
    findPerQuestion(questionId: number): Promise<import("../question/question.model").Question>;
    findOne(id: number): Promise<Answer>;
    update(id: number, updateAnswer: Answer): Promise<Answer>;
    remove(id: number): Promise<void>;
}
