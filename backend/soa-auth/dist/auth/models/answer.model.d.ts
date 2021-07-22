import { Model } from "sequelize-typescript";
import { Question } from "./question.model";
import { User } from "./users.model";
export declare class Answer extends Model {
    body: string;
    upVotes: number;
    userId: number;
    questionId: number;
    user: User;
    question: Question;
}
