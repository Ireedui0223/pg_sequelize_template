import { Router, Request, Response } from 'express';
import userRoutes from './api/user';
import bookRouter from './api/book';
import categoryRouter from './api/category';

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
route.use('/api', bookRouter);
route.use('/api', categoryRouter);
export default route;
