import User from '../database/models/user';

export default class UserController {
  static async createUser(doc): Promise<any> {
    const { username, email, password, roles } = doc;

    const user = await User.create({
      username,
      email,
      password,
      roles
    });
    return user;
  }
  static async getUsers() {
    const users = await User.findAll();
    return users;
  }
}
