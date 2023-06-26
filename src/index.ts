import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import morgan from 'morgan';

import routes from './routes';
import { connectionDb } from './database';

const { PORT } = process.env;
const app: Application = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/', async (__: Request, res: Response): Promise<Response> => {
  return res.json({
    success: true,
    message: 'amjilttai'
  });
});

app.use(routes);

app.use(
  (
    err: Error,
    _: express.Request,
    res: express.Response,
    __: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

app.listen(PORT, () => {
  connectionDb();
  console.log(`Example app listening at http://localhost:${PORT}`);
});
