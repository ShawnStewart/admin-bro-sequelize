// This is an example I saw on SO using define .This approach might
// be more light weight, but you don't get all the typings that
// you'd want when using TS. I'd would stick with the class approach.

import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class User extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): UserModel;
};

export function UserFactory(sequelize: Sequelize): UserStatic {
    return <UserStatic>sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });
}