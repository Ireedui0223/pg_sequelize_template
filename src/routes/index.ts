import { Router, Request, Response } from 'express';
import userRoutes from './api/user';

const route = Router();

route.post(
  '/api/health-check',
  async (_: Request, res: Response): Promise<Response> => {
    return res.json({
      success: true
    });
  }
);

route.use('/api', userRoutes);

export default route;
