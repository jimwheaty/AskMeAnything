import { Model } from 'sequelize-typescript';
import { Answer } from './answer.model';
import { Tag } from './tags.model';
import { User } from './users.model';
export declare class Question extends Model {
    title: string;
    body: string;
    views: number;
    upVotes: number;
    userId: number;
    answers: Answer[];
    user: User;
    tags: Tag[];
}
