import { Router, Request, Response } from 'express';
import file_controller from '../../controllers/file';

const router = Router();

router.post(
  '/create_file',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { body } = req;

      const file = await file_controller.createFile(body);
      return res.json({
        success: true,
        file
      });
    } catch (err) {
      return res.json({
        success: false,
        message: err.message
      });
    }
  }
);

export default router;
