import { DataTypes } from "sequelize";
import { AllowNull, Column, Model, Table, Unique } from "sequelize-typescript";

@Table
export class Users extends Model {
    @AllowNull(false)
    @Unique(true)
    @Column
    username: string

    @AllowNull(false)
    @Unique(true)
    @Column
    email: string

    @AllowNull(false)
    @Column
    password: string

    @AllowNull(true)
    @Column
    bio: string

    @AllowNull(true)
    @Column
    avatar: DataTypes.BlobDataType

}