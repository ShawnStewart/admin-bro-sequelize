import {
    Association,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyAddAssociationsMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyHasAssociationMixin,
    HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManyRemoveAssociationsMixin,
    HasManySetAssociationsMixin,
    Model,
    Optional,
    Sequelize,
} from 'sequelize';
import Post from './Post';

// These are all the attributes in the User model
// You can _kinda_ think of these as columns
interface UserAttributes {
    id: number;
    name: string;
}

// Some fields are optional when calling User.create() or User.build()
type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export default class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public name!: string;

    // timestamps are handled by default
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Associations

    // TS cannot determine model association at compile time,
    // so we have to declare them here purely virtually. These
    // don't actually exist until the associations are made.
    // Ex: `User.hasMany(Posts);`

    // After the association has been made, these helper methods
    // exist. All we are really doing here is making TypeScript
    // aware of them. You likely wouldn't define them all,
    // just as you need them.
    public addPost!: HasManyAddAssociationMixin<Post, number>;
    public addPosts!: HasManyAddAssociationsMixin<Post, number>;
    public countPosts!: HasManyCountAssociationsMixin;
    public createPost!: HasManyCreateAssociationMixin<Post>;
    public getPosts!: HasManyGetAssociationsMixin<Post>;
    public hasPost!: HasManyHasAssociationMixin<Post, number>;
    public hasPosts!: HasManyHasAssociationsMixin<Post, number>;
    public removePost!: HasManyRemoveAssociationMixin<Post, number>;
    public removePosts!: HasManyRemoveAssociationsMixin<Post, number>;
    public setPosts!: HasManySetAssociationsMixin<Post, number>;

    // Inclusions

    // We can also pre-declare possible inclusions, again, this is just
    // for TypeScript to be aware. These will only be populated if you
    // actively `include` a relation.
    public readonly posts?: Post[];

    // This is what we use to declare an inclusion.
    // Ex: `const user = User.findByPk(123, { include: [User.associations.posts] })`
    public static associations: {
        posts: Association<User, Post>;
    };

    // Custom initializer method
    // This `Model.init` method is where we actually define our
    // table columns and properties. Notice how we only define
    // what's in our `ModelAttributes`, no timestamps or foreign
    // keys - those are handled automatically.
    public static initModel = (sequelize: Sequelize): void => {
        User.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING(128),
                    allowNull: false,
                },
            },
            {
                sequelize,
                paranoid: true, // paranoid true gives us a handly soft deletion
            }, // timestamps and other table options can be configured here
        );
    };
}
