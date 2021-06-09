import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Question } from "src/question/question.model";

@Table({
    timestamps: false
})
export class Tag extends Model {
    @AllowNull(false)
    @Column
    field: string;

    @ForeignKey(() => Question)
    @Column
    questionId: number;

    @BelongsTo(() => Question)
    question: Question;
}