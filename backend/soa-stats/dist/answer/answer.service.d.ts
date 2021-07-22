import { ClientProxy } from '@nestjs/microservices';
import { Question } from 'src/question/question.model';
import { Answer } from './answer.model';
export declare class AnswerService {
    private readonly authClient;
    private answerModel;
    private questionModel;
    constructor(authClient: ClientProxy, answerModel: typeof Answer, questionModel: typeof Question);
    getUserFromJWT(jwt: string): import("rxjs").Observable<any>;
    create(newAnswer: Answer): Promise<Answer>;
    findAll(): Promise<Answer[]>;
    findPerUser(userId: number, limit: string): Promise<Answer[]>;
    findPerQuestion(questionId: number): Promise<Question>;
    findOne(id: number): Promise<Answer>;
    update(id: number, answerUpdate: Answer): Promise<Answer>;
    remove(id: number): Promise<void>;
}
