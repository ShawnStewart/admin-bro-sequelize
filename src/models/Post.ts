import { Association, DataTypes, HasOneGetAssociationMixin, Model, Optional, Sequelize } from 'sequelize';
import User from './User';

interface PostAttributes {
    id: number;
    title: string;
    text: string;
}

type PostCreationAttributes = Optional<PostAttributes, 'id'>;

export default class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
    id!: number;
    title!: string;
    text!: string;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    public getUser!: HasOneGetAssociationMixin<User>;

    public readonly author?: User;

    public static associations: {
        posts: Association<Post, User>;
    };

    static initModel = (sequelize: Sequelize): void => {
        Post.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                text: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            { sequelize, paranoid: true },
        );
    };
}
