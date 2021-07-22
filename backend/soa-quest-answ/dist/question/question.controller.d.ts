import { QuestionService } from './question.service';
import { Question } from './question.model';
import { JwtService } from '@nestjs/jwt';
export declare class QuestionController {
    private readonly questionService;
    private readonly jwtService;
    constructor(questionService: QuestionService, jwtService: JwtService);
    create(newQuestion: Question, req: any): Promise<Question>;
    getQuestionsByDate(userId: any, year: any, month: any): Promise<Question[]>;
    findAll(): Promise<Question[]>;
    findPerUser(userId: number, limit: string): Promise<Question[]>;
    findPerTag(tag: string, limit: string): Promise<Question[]>;
    findOne(id: string): Promise<Question>;
    update(id: string, updateQuestion: Question): Promise<Question>;
    remove(id: string): Promise<void>;
}
