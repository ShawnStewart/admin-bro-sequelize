import { Sequelize } from 'sequelize';

import User from './User';
import Post from './Post';

export { default as User } from './User';
export { default as Post } from './Post';

export const db = new Sequelize({
    port: 5432,
    host: 'localhost',
    dialect: 'postgres',
    username: 'postgres',
    password: 'postgres',
    database: 'admin_bro',
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000,
    },
});

// Initialize models
User.initModel(db);
Post.initModel(db);

// Associate models
User.hasMany(Post, { foreignKey: 'AuthorId' });
Post.belongsTo(User);
