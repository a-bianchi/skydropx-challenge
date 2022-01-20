const config = {
  development: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5433',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'skydropx',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    define: {
      underscored: 'true',
      timestamps: 'false',
      freezeTableName: true,
    },
  },
  test: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5433',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'skydropx',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    define: {
      underscored: 'true',
      timestamps: 'false',
      freezeTableName: true,
    },
  },
  production: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5433',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'skydropx',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    ssl: true,
    define: {
      underscored: 'true',
      timestamps: 'false',
      freezeTableName: true,
    },
  },
};

module.exports = config;
