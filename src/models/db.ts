import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { Config } from '../config/config';

const sequelizeInstance = new Sequelize({
  database: Config.db.database,
  username: Config.db.username,
  password: Config.db.password,
  host: Config.db.host,
  port: Config.db.port,
  logging: false,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  models: [path.join(__dirname, '**/*.model.ts')],
  modelMatch: (filename: string, member: string): boolean => {
    return filename.substring(0, filename.indexOf('.model')) === member;
  },
});

export const sequelize = sequelizeInstance;
