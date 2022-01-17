import app from './app';
import { logger } from './services/logger.service';
import { Config } from './config/config';

app.listen(Number(Config.api.port), () => {
  logger.info(`Running on port ${Config.api.port}... Open http://localhost:3001/docs/`);
});
