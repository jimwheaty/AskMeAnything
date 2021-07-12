import { AllowNull, BelongsTo, Column, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import { Question } from "src/question/question.model";
import { User } from "src/users/users.model";

@Table
export class Answer extends Model {
    @AllowNull(false)
    @Column
    body: string;

    @AllowNull(false)
    @Default(0)
    @Column
    upVotes: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => Question)
    @Column
    questionId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Question)
    question: Question;

}