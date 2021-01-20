import AdminBro from 'admin-bro';
import AdminBroSequelize from '@admin-bro/sequelize';

import { db } from '../models';

AdminBro.registerAdapter(AdminBroSequelize);
export const adminBro = new AdminBro({
    databases: [db],
    rootPath: '/admin',
});

export { buildRouter } from '@admin-bro/koa';
