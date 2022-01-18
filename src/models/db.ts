import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { Config } from '../config/config';

type DialectOptions = {
  ssl?: { required: boolean; rejectUnauthorized: boolean };
  options: {
    validateBulkLoadParameters: boolean;
  };
};

const dialectOptions: DialectOptions = {
  options: {
    validateBulkLoadParameters: true,
  },
};

if (!process.env.LOCAL) dialectOptions.ssl = { required: true, rejectUnauthorized: process.env.NODE_ENV === 'production' ? true : false };

export const sequelize = new Sequelize({
  database: Config.db.database,
  username: Config.db.username,
  password: Config.db.password,
  host: Config.db.host,
  port: Config.db.port,
  dialect: 'postgres',
  dialectOptions,
  models: [path.join(__dirname, '**/*.model.ts')],
  modelMatch: (filename: string, member: string): boolean => {
    return filename.substring(0, filename.indexOf('.model')) === member;
  },
});
