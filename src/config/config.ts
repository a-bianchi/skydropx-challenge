import { config as configDotenv } from 'dotenv';
configDotenv();

// #region Helper functions  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const parseParamInt = (envValue: string, defaultValue: string | number): string | number => {
  if (envValue === undefined || envValue === null) {
    return defaultValue;
  }
  return parseInt(envValue, 10);
};
// #endregion

export const Config = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5433,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'skydropx',
    dialect: 'postgres',
    logging: false,
    seederStorage: 'sequelize',
    define: {
      underscored: 'true',
      timestamps: 'false',
      freezeTableName: true,
    },
  },
  api: {
    port: parseParamInt(process.env.API_PORT, 3001),
    secret: process.env.API_SECRET || 'secret',
    environment: process.env.ENVIRONMENT || 'PROD',
    nodeEnv: process.env.NODE_ENV || 'production',
    defaultPageSize: Number(process.env.DEFAULT_PAGE_SIZE) || 25,
  },
  logger: {
    level: process.env.LOGGER_LEVEL || 'info',
    errorFile: process.env.LOGGER_FILE_ERROR || './var/logs/error.log',
    combinedFile: process.env.LOGGER_FILE_COMBINED || './var/logs/combined.log',
  },
  security: {
    tokenExpiry: parseParamInt(process.env.SECURITY_TOKEN_EXPIRY, 1800),
    tokenExpiryRefresh: parseParamInt(process.env.SECURITY_TOKEN_EXPIRY, '60d'),
    passwordResetTimeout: parseParamInt(process.env.SECURITY_PASSWORD_RESET_TIMEOUT, 720),
    secretKeyJwt: process.env.SECURITY_SECRET_KEY_JWT,
    bcryptSaltRounds: 10,
    aesCypherKey: process.env.AES_CYPHER_KEY,
  },
};
