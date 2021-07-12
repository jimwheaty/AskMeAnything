import { AllowNull, Column, HasMany, Model, Table, Unique } from "sequelize-typescript";
import { Answer } from "src/answer/answer.model";
import { Question } from "src/question/question.model";

@Table
export class User extends Model {
    @AllowNull(false)
    @Unique(true)
    @Column
    username: string;

    @AllowNull(false)
    @Unique(true)
    @Column
    email: string;

    @AllowNull(false)
    @Column
    password: string;

    @AllowNull(true)
    @Column
    bio: string;

    @HasMany(() => Answer)
    answers: Answer[];

    @HasMany(() => Question)
    questions: Question[];

}