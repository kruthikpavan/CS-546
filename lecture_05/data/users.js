import {users} from '../config/mongoCollections.js';

import {ObjectId} from 'mongodb';
import validation from './validation.js';

let exportedMethods = {
  async getAllUsers() {
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    return userList;
  },
  async getUserById(id) {
    id = validation.checkId(id);
    const userCollection = await users();
    const user = await userCollection.findOne({_id: ObjectId(id)});
    if (!user) throw 'Error: User not found';
    return user;
  },
  async addUser(firstName, lastName) {
    firstName = validation.checkString(firstName, 'First name');
    lastName = validation.checkString(lastName, 'Last name');

    const userCollection = await users();

    let newUser = {
      firstName: firstName,
      lastName: lastName,
    };

    const newInsertInformation = await userCollection.insertOne(newUser);
    if (!newInsertInformation.insertedId) throw 'Insert failed!';
    return await this.getUserById(newInsertInformation.insertedId.toString());
  },
  async removeUser(id) {
    id = validation.checkId(id);
    const userCollection = await users();
    const deletionInfo = await userCollection.deleteOne({_id: ObjectId(id)});
    if (deletionInfo.deletedCount === 0) {
      throw `Error: Could not delete user with id of ${id}`;
    }
    return true;
  },
  async updateUser(id, firstName, lastName) {
    id = validation.checkId(id);
    firstName = checkString(firstName, 'first name');
    lastName = checkString(lastName, 'last name');
    const user = await this.getUserById(id);

    const userUpdateInfo = {
      firstName: firstName,
      lastName: lastName,
    };

    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      {_id: ObjectId(id)},
      {$set: userUpdateInfo}
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Error: Update failed';

    return await this.getUserById(id);
  },
};

export default exportedMethods;
