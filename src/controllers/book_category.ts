import Book_category from '../database/models/book_category';

export default class Book_category_controller {
  static async create_book_controller(doc): Promise<any> {
    const { book_id, category_id } = doc;
    const book_category = await Book_category.create({
      Book_id: book_id,
      Category_id: category_id
    });
    return book_category;
  }
}
