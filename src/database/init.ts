import Book_category from './models/book_category';
import File from './models/file';
import Chapter from './models/chapter';
import Book from './models/book';
import Category from './models/category';
import User from './models/user';

let models = [Book, Category, Chapter, Book_category, File, User];
const init = (sequelize) => {
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
    as: 'image_file,',
    foreignKey: 'image_id'
    // targetKey: 'id',
    // foreignKey: 'image_id'
  });

  File.hasOne(Book, {
    sourceKey: 'id',
    foreignKey: 'image_id'
  });
};

export {
  init,
  Book as BookModel,
  Category as CategoryModel,
  File as FileModel,
  User as UserModel
};
