import { Model } from 'sequelize-typescript';
import { Answer } from 'src/answer/answer.model';
import { Tag } from 'src/tags/tags.model';
import { User } from 'src/users/users.model';
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
