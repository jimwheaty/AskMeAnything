import { AllowNull, BelongsTo, Column, Default, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Answer } from 'src/answer/answer.model';
import { Tag } from 'src/tags/tags.model';
import { User } from 'src/users/users.model';

@Table
export class Question extends Model {
    @AllowNull(false)
    @Column
    title: string;
    
    @AllowNull(false)
    @Column
    body: string;

    @AllowNull(false)
    @Default(0)
    @Column
    views: number;

    @AllowNull(false)
    @Default(0)
    @Column
    upVotes: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @HasMany(() => Answer)
    answers: Answer[];

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Tag)
    tags: Tag[]
}