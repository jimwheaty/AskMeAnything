import { Model } from "sequelize-typescript";
import { Question } from "./question.model";
export declare class Tag extends Model {
    field: string;
    questionId: number;
    question: Question;
}
