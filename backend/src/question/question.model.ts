import { AllowNull, Column, Model, Table } from 'sequelize-typescript';

@Table
export class Question extends Model {
    @AllowNull(false)
    @Column
    title: string
    
    @AllowNull(false)
    @Column
    core: string
}