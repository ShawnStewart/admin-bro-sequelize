import { Sequelize } from 'sequelize';

import User from './User';
import Post from './Post';

export { default as User } from './User';
export { default as Post } from './Post';

const localDB = 'postgres://postgres@localhost:5432/admin_bro';
const dbUrl = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL || '' : localDB;

export const db = new Sequelize(dbUrl, {
    dialect: 'postgres',
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
