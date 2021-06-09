import { Model } from "sequelize-typescript";
import { Question } from "src/question/question.model";
export declare class Tag extends Model {
    field: string;
    questionId: number;
    question: Question;
}
