// Just showing some querying functionality of sequelize

import { db, User, Post } from '../models';

export const queryPlayGround = async (): Promise<void> => {
    // Basics
    console.log('\n*****************');
    console.log('* Basic Queries *');
    console.log('*****************');

    // Find or create user
    console.log('\nStarting by finding or creating a user');
    const [user, created] = await User.findOrCreate({ where: { name: 'Shawn' } });
    // console.log('\nThe user raw...\n', user); - logging user has a lot of sequelize properties
    console.log('Our user object', user.toJSON()); // use `.toJSON()` instead to get an object representation
    console.log('Was created?:', created);

    console.log('\nGetting total Users count');
    const { count, rows } = await User.findAndCountAll();
    console.log('Total post count:', count);
    console.log('Rows?', JSON.stringify(rows));

    // Associations
    console.log('\n****************');
    console.log('* Associations *');
    console.log('****************');

    console.log('\nCreating some Posts to associate to our User');
    const POST_NUMBERS = [1, 2, 3];
    const createdPosts = await Post.bulkCreate(
        POST_NUMBERS.map((n) => ({ text: `Post #${n}`, title: `Post Title #${n}` })),
    );

    console.log('\nAdd association');
    await user.addPost(createdPosts[0]);
    console.log('\nAdd multiple associations');
    await user.addPosts(createdPosts);
    console.log('\nCount associations');
    await user.countPosts();
    console.log('Get associations');
    await user.getPosts();
    console.log('\nHas association');
    await user.hasPost(createdPosts[0]);
    console.log('\nHas multiple associations');
    await user.hasPosts(createdPosts);
    console.log('\nRemove associations');
    await user.removePost(createdPosts[0]);
    console.log('\nRemove multiple associations');
    await user.removePosts(createdPosts);
    console.log('\nSet associations'); // Overwrites other associations
    await user.setPosts(createdPosts);

    // Inclusions
    console.log('\n**************');
    console.log('* Inclusions *');
    console.log('**************');

    // Inclusions are like expansions
    console.log('\nQuerying for User `including` Posts', typeof Post);
    const userIncludingPosts = await User.findOne({
        include: [db.models.Post],
        rejectOnEmpty: true,
    });
    console.log('Found user', userIncludingPosts.toJSON());

    // Clearing db
    console.log('\nClearing posts table...');
    Post.sync({ force: true });
};
