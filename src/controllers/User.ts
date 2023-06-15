import { UserModel } from '../database';

export default class UserController {
  static async createUser(doc): Promise<any> {
    const { username, email, password } = doc;
    const user = await UserModel.create({
      username,
      email,
      password
    });
    user.save();
    const user_data = user.toJSON();
    return user_data;
  }
  static async getUsers() {
    const users = await UserModel.findAll();
    const users_data = JSON.stringify(users);
    return users_data;
  }
}
