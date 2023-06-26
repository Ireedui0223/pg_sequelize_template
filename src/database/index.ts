import 'dotenv/config';
import { Sequelize } from 'sequelize';
import Chapter from './models/chapter';
import Book from './models/book';
import Category from './models/category';
import Book_category from './models/book_category';
import File from './models/file';

const sequelize = new Sequelize('meBook', 'postgres', '9185', {
  dialect: 'postgres',
  host: 'localhost',
  logging: false
});

let models = [Book, Category, Chapter, Book_category, File];

models.forEach((model) => model.createModel(sequelize));

Chapter.hasOne(Book, {
  sourceKey: 'id',
  foreignKey: 'chapter_id'
});

Book.belongsToMany(Category, {
  through: Book_category,
  as: 'Books',
  foreignKey: 'Book_id'
});
Category.belongsToMany(Book, {
  through: Book_category,
  as: 'Categories',
  foreignKey: 'Category_id'
});
Book.belongsTo(File, {
  targetKey: 'id',
  foreignKey: 'image_id'
});

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
