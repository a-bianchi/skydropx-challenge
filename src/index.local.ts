import app from './app';
import { logger } from './services/logger.service';
import config from './config/config';

app.listen(Number(config.api.port), () => {
  logger.info(`Running on port ${config.api.port}... Open http://localhost:3001/docs/`);
});
