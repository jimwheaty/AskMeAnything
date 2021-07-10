import { Model } from "sequelize-typescript";
import { Answer } from "src/answer/answer.model";
import { Question } from "src/question/question.model";
export declare class User extends Model {
    username: string;
    email: string;
    password: string;
    bio: string;
    answers: Answer[];
    questions: Question[];
}
