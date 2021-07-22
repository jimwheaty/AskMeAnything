import { Model } from "sequelize-typescript";
import { Answer } from "./answer.model";
import { Question } from "./question.model";
export declare class User extends Model {
    username: string;
    email: string;
    password: string;
    bio: string;
    answers: Answer[];
    questions: Question[];
}
