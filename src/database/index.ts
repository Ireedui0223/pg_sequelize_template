import 'dotenv/config';
import { Sequelize } from 'sequelize';
import Chapter from './models/chapter';
import Book from './models/book';
import Category from './models/category';
import Book_category from './models/book_category';

const sequelize = new Sequelize('meBook', 'postgres', '9185', {
  dialect: 'postgres',
  host: 'localhost',
  logging: false
});

let models = [Book, Category, Book_category, Chapter];

models.forEach((model) => model.createModel(sequelize));

Chapter.hasOne(Book, {
  sourceKey: 'id',
  foreignKey: 'chapter_id'
});

Book.hasOne(Book_category, {
  sourceKey: 'bookId',
  foreignKey: 'bookId'
});

Category.hasMany(Book_category, {
  sourceKey: 'id',
  foreignKey: 'chapterId'
});

// Category.hasMany(Book, {
//   foreignKey: 'categories',
//   sourceKey: 'id'
// });

const connectionDb = async (): Promise<void> => {
  try {
    sequelize.authenticate();
    sequelize.sync({ force: true, alter: true });
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
