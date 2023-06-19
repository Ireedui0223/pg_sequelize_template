import { Request, Response, Router } from 'express';
import CategoryController from '../../controllers/category';

const router = Router();

router.get(
  '/get_categories',
  async (__: Request, res: Response): Promise<Response> => {
    try {
      const categories = await CategoryController.getCategories();
      return res.json({
        success: true,
        categories
      });
    } catch (err) {
      return res.json({
        success: false,
        message: err
      });
    }
  }
);

router.post(
  '/create_category',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { body } = req;
      const category = await CategoryController.createCategory(body);
      return res.json({
        success: true,
        category
      });
    } catch (err) {
      return res.json({
        success: false,
        message: err
      });
    }
  }
);

export default router;
