import { QuestionService } from './question.service';
import { Question } from './question.model';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(newQuestion: Question, req: any): Promise<Question>;
    findAll(): Promise<Question[]>;
    findPerUser(userId: number, limit: string): Promise<Question[]>;
    findPerTag(tag: string, limit: string): Promise<Question[]>;
    findOne(id: string): Promise<Question>;
    update(id: string, updateQuestion: Question): Promise<Question>;
    remove(id: string): Promise<void>;
}
