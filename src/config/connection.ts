import { Sequelize } from 'sequelize-typescript';
import { PoolOptions } from 'sequelize/types';

const dirName = __dirname.replace('config', '');
export const openConnection = (
  dbName: string,
  dbUser: string,
  dbPassword: string,
  dbHost: string,
  dbPort: number,
  poolOpts: PoolOptions,
): Sequelize =>
  new Sequelize({
    database: dbName,
    username: dbUser,
    password: dbPassword,
    host: dbHost,
    port: dbPort,
    pool: poolOpts,
    dialect: 'postgres',
    dialectOptions: {
      ssl: { required: true, rejectUnauthorized: process.env.NODE_ENV === 'production' ? true : false },
      options: {
        validateBulkLoadParameters: true,
      },
    },
    define: {
      schema: 'core',
    },
    models: [`${dirName}models/**.model.ts`],
    modelMatch: (filename: string, member: string): boolean => {
      return filename.substring(0, filename.indexOf('.model')) === member;
    },
  });
