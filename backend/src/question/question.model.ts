import { AllowNull, Column, Default, Model, Table } from 'sequelize-typescript';

@Table
export class Question extends Model {
    @AllowNull(false)
    @Column
    title: string
    
    @AllowNull(false)
    @Column
    body: string

    @AllowNull(false)
    @Default(0)
    @Column
    views: number

    @AllowNull(false)
    @Default(0)
    @Column
    upVotes: number
}