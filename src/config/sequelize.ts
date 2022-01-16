const config = {
  db: {
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
};

module.exports = config;
