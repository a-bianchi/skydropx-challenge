import winston from 'winston';
import { Config } from '../config/config';

const transports = [];

transports.push(new winston.transports.File({ filename: Config.logger.errorFile, level: 'error' }));
transports.push(new winston.transports.File({ filename: Config.logger.combinedFile }));

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  // defaultMeta: { service: 'user-service' },
  transports,
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  winstonLogger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

// -- capture error
winstonLogger.on('error', (err) => {
  /* Do Something */
  winstonLogger.info('Logger error', err);
});

// create a stream object with a 'write' function that will be used by `morgan`. This stream is based on node.js stream https://nodejs.org/api/stream.html.
export const stream = {
  write: (message: string): void => {
    winstonLogger.info(message);
  },
};

export const logger = winstonLogger;
