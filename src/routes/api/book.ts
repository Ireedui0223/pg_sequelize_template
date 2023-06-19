import { Router, Request, Response } from 'express';
import BookController from '../../controllers/book';

const router = Router();

router.post(
  '/create_book',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { body } = req;
      const book = await BookController.createBook(body);
      return res.json({
        success: true,
        message: book
      });
    } catch (err) {
      return res.json({
        success: false,
        message: err
      });
    }
  }
);

router.get(
  '/get_books',
  async (__: Request, res: Response): Promise<Response> => {
    try {
      const books = await BookController.getBooks();
      return res.json({
        success: true,
        message: books
      });
    } catch (err) {
      return res.json({
        success: true,
        message: err
      });
    }
  }
);

export default router;
