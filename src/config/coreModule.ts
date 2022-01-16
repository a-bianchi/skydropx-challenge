import { Sequelize } from 'sequelize-typescript';
import { PoolOptions } from 'sequelize/types';
import { openConnection } from './connection';
import * as Models from '../models';

const defaultPoolOptions: PoolOptions = {
  max: 1,
  min: 0,
  idle: 2000, //2seg
};

const dirName = __dirname.replace('config', '');
export class CoreModule {
  public db: Sequelize;
  public models: typeof Models;

  constructor(
    db_name: string,
    db_user: string,
    db_pass: string,
    db_host: string,
    db_port: number,
    poolOpts: PoolOptions = defaultPoolOptions,
  ) {
    this.models = Models;
    this.db = openConnection(db_name, db_user, db_pass, db_host, db_port, poolOpts);
    this.db.addModels([__dirname + '/models/**/*.model.ts']);
    this.checkAuthenticate(db_host);
  }

  private checkAuthenticate(host: string): void {
    this.db
      .authenticate()
      .then(() => console.log(`Connection has been established successfully. ${host}`))
      .catch((error: any) => console.error('Unable to connect to the database:', error));
  }
}
