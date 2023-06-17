import 'dotenv/config';
import { Options, Sequelize } from 'sequelize';
import Blog from './models/Blog';
import User from './models/User';
import Book from './models/Book';
import Category from './models/Category';
import Chapter from './models/Chapter';
import File from './models/File';

const sequelize = new Sequelize(<Options>{
  database: 'sequelize_db',
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '9185',
  logging: false
});

let models = [User, Blog, Book, Category, Chapter, File];

models.forEach((model) => model.createModel(sequelize));

const connectionDb = async (): Promise<void> => {
  try {
    sequelize.authenticate();
    sequelize.sync({ force: false, alter: true });
  } catch (err) {
    console.log('Database error:', err.message);
  }
};

export { sequelize as Database, User as UserModel, connectionDb };
