import { BookModel } from '../database';

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
}
