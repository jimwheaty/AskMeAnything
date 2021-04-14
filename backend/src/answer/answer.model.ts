import { AllowNull, Column, Model, Table } from "sequelize-typescript";

@Table
export class Answer extends Model {
    @AllowNull(false)
    @Column
    body: string

    @AllowNull(false)
    @Column
    upVotes: number

}