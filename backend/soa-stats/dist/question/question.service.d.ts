import { Tag } from 'src/tags/tags.model';
import { Question } from './question.model';
export declare class QuestionService {
    private readonly questionModel;
    private readonly tagModel;
    constructor(questionModel: typeof Question, tagModel: typeof Tag);
    findAll(): Promise<Question[]>;
    findOne(id: string): Promise<Question>;
    findPerUser(userId: number, limit: string): Promise<Question[]>;
    findPerTag(tag: string, limit: string): Promise<Question[]>;
    create(question: Question): Promise<Question>;
    update(id: string, questionUpdate: Question): Promise<Question>;
    remove(id: string): Promise<void>;
}
