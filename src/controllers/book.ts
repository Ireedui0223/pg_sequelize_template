import { BookModel } from '../database/init';
import Category from '../database/models/category';
import { FileModel } from '../database/init';
import Book_category_controller from './book_category';
export default class BookController {
  static async createBook(doc): Promise<any> {
    const {
      title,
      author,
      description,
      image_id,
      url,
      categories,
      about,
      keyIdeas,
      intendedUser,
      tags,
      status,
      isSpecial
    } = doc;
    const book = await BookModel.create({
      title,
      author,
      description,
      image_id,
      url,
      categories,
      about,
      keyIdeas,
      intendedUser,
      tags,
      status,
      isSpecial
    });
    if (book.dataValues) {
      console.log(book.dataValues, 'id');
      const book_category =
        await Book_category_controller.create_book_controller({
          book_id: book.dataValues.bookId,
          category_id: categories
        });
      console.log(book_category, 'cate');
    }

    return book;
  }
  static async getBooks() {
    console.log('books started');
    const books = await BookModel.findAll({
      include: [FileModel]
    });

    console.log(books, 'books');

    return books;
  }

  static async getBookByTitle({ title }) {
    const book = await BookModel.findOne({
      where: {
        title
      }
    });
    return book;
  }

  static async getBookByCategoires({ category_id }) {
    console.log(category_id);

    const books = await BookModel.findAll({
      include: [
        {
          model: Category,
          through: {
            attributes: ['Book_id', 'Category_id']
          }
        }
      ]
    })
      .then((book) => {
        return book;
      })
      .catch((err) => {
        throw new Error(err);
      });

    return books;
  }
}
