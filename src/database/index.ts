import 'dotenv/config';
import { Sequelize } from 'sequelize';
import { init } from './init';
const sequelize = new Sequelize('meBook', 'postgres', '9185', {
  dialect: 'postgres',
  host: 'localhost',
  logging: false
});

init(sequelize);

const connectionDb = async (): Promise<void> => {
  try {
    sequelize.authenticate();
    sequelize.sync({ force: false, alter: true });
  } catch (err) {
    console.log('Database error:', err.message);
  }
};

export { sequelize as Database, connectionDb };
