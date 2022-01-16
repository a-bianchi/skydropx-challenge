import { CoreModule } from './coreModule';
import config from './config';

// DATABASE
const coreModule = new CoreModule(
  config.db.database,
  config.db.username,
  config.db.password,
  config.db.sequelize.host,
  Number(config.db.port),
  {
    max: 5,
    idle: 10000,
    min: 0,
  },
);

export const db = coreModule.db;
