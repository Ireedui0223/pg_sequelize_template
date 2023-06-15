import { Router, Request, Response } from 'express';
import UserController from '../../controllers/User';

const router = Router();

router.post(
  '/create_user',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { body } = req;

      const { username, email, password } = body;

      const user = await UserController.createUser({
        username,
        email,
        password
      });
      return res.json({
        success: true,
        message: user
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
  '/get_users',
  async (_: Request, res: Response): Promise<Response> => {
    try {
      const users = await UserController.getUsers();
      return res.json({
        success: true,
        users
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
