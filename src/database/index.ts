import 'dotenv/config';
import User from './models/User';
import { Options, Sequelize } from 'sequelize';

const sequelize = new Sequelize(<Options>{
  database: 'sequelize_db',
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '9185'
});

let models = [User];

models.forEach((model) => model.createModel(sequelize));

const connectionDb = async (): Promise<void> => {
  try {
    sequelize.authenticate();
    sequelize.sync({ force: false, alter: true });
  } catch (err) {
    console.log('Database error:', err.message);
  }
};

export { sequelize as Database, User as UserModel, connectionDb };
