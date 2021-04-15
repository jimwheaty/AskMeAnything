import { AllowNull, Column, Default, Model, Table } from "sequelize-typescript";

@Table
export class Answer extends Model {
    @AllowNull(false)
    @Column
    body: string

    @AllowNull(false)
    @Default(0)
    @Column
    upVotes: number

}