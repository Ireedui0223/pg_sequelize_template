import { BookModel } from '../database';
import Category from '../database/models/category';
import Book_category_controller from './book_category';
export default class BookController {
  static async createBook(doc): Promise<any> {
    const {
      title,
      author,
      description,
      image,
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
      image,
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
    const books = await BookModel.findAll();
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

    const books = await BookModel.findByPk(category_id, {
      include: [
        {
          model: Category,
          as: 'models',
          attributes: ['title', 'icon', 'description'],
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
    console.log(books, 'qwiejqwiej');

    return books;
  }
}
