import 'dotenv/config';
import { Sequelize } from 'sequelize';
import Blog from './models/blog';
import User from './models/user';
import Book from './models/book';
import Category from './models/category';
import Chapter from './models/chapter';
import File from './models/file';

const sequelize = new Sequelize('sequelize_db', 'postgres', '9185', {
  dialect: 'postgres',
  host: 'localhost',
  logging: false
});

let models = [User, Blog, Book, Category, Chapter, File];

models.forEach((model) => model.createModel(sequelize));

// Book.hasMany(Category, { as: 'categories' });
// Category.belongsTo(Book);
// Category.belongsTo(Book, {
//   foreignKey: 'id',
//   as: 'categoryId'
// });
// Category.hasMany(Book, { as: 'bookId' });
// Book.belongsTo(Book, {
//   foreignKey: 'id',
//   as: 'bookId'
// });

const connectionDb = async (): Promise<void> => {
  try {
    sequelize.authenticate();
    sequelize.sync({ force: false, alter: true });
  } catch (err) {
    console.log('Database error:', err.message);
  }
};

export {
  sequelize as Database,
  Book as BookModel,
  Category as CategoryModel,
  connectionDb
};
