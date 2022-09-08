import {posts} from '../config/mongoCollections.js';
import userData from './users.js';
import {ObjectId} from 'mongodb';
import validation from './validation.js';

const exportedMethods = {
  async getAllPosts() {
    const postCollection = await posts();
    return await postCollection.find({}).toArray();
  },
  async getPostById(id) {
    id = validation.checkId(id);
    const postCollection = await posts();
    const post = await postCollection.findOne({_id: ObjectId(id)});

    if (!post) throw 'Error: Post not found';
    return post;
  },
  async addPost(title, body, posterId) {
    title = validation.checkString(title, 'title');
    body = validation.checkString(body, 'body');
    posterId = validation.checkId(posterId);

    const postCollection = await posts();
    const userThatPosted = await userData.getUserById(posterId);

    let newPost = {
      title: title,
      body: body,
      poster: {
        id: posterId,
        name: `${userThatPosted.firstName} ${userThatPosted.lastName}`,
      },
    };

    const newInsertInformation = await postCollection.insertOne(newPost);
    if (!newInsertInformation.insertedId) throw 'Error: Insert failed!';

    return this.getPostById(newInsertInformation.insertedId.toString());
  },
  async removePost(id) {
    id = validation.checkId(id);
    const postCollection = await posts();
    const deletionInfo = await postCollection.deleteOne({_id: ObjectId(id)});
    if (deletionInfo.deletedCount === 0)
      throw `Error: Could not delete post with id of ${id}`;
    return true;
  },
  async updatePost(id, title, body, posterId) {
    id = validation.checkId(id);
    title = validation.checkString(title, 'title');
    body = validation.checkString(body, 'body');
    posterId = validation.checkId(posterId);
    const postCollection = await posts();
    const userThatPosted = await userData.getUserById(posterId);

    let updatedPost = {
      title: title,
      body: body,
      poster: {
        id: posterId,
        name: userThatPosted.name,
      },
    };
    const updateInfo = await postCollection.updateOne(
      {_id: ObjectId(id)},
      {$set: updatedPost}
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Error: Update failed';
    return this.getPostById(id);
  },
};

export default exportedMethods;
