import Koa from 'koa';

import { adminBro, buildRouter } from './admin';
import { db } from './models';
import { queryPlayGround } from './playground/query';

const app = new Koa();
const router = buildRouter(adminBro, app);

app.use(router.routes()).use(router.allowedMethods());

const authenticateDB = async () => {
    console.log('\n=== Testing db connection ===');
    await db.authenticate();
    console.log('=== Successfully connected to Postgres ===');
};

const syncDB = async () => {
    console.log('\n=== Syncs are used to update tables to match models ===');
    await db.sync({ force: true });
    console.log('=== Sync successful ===');
};

app.listen(3000).on('listening', async () => {
    console.log('=== Server listening on port 3000 ===');

    try {
        await authenticateDB();
        // await syncDB(); // hard resets db
    } catch (error) {
        console.log('\nFailed to authenticate or sync\n', error);
    }

    // Playing with queries
    try {
        // queryPlayGround();
    } catch (error) {
        console.log('\nError in playground...\n', error);
    }
});
