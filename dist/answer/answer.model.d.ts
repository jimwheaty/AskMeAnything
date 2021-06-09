import { Model } from "sequelize-typescript";
import { Question } from "src/question/question.model";
import { User } from "src/users/users.model";
export declare class Answer extends Model {
    body: string;
    upVotes: number;
    userId: number;
    questionId: number;
    user: User;
    question: Question;
}
