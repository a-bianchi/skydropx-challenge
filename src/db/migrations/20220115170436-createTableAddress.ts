import { QueryInterface, DataTypes } from 'sequelize';

// address_from_postal_code ,address_from_country_code

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('address', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      street: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      province: {
        type: DataTypes.STRING,
      },
      postal_code: {
        type: DataTypes.INTEGER,
      },
      country_code: {
        type: DataTypes.STRING,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('Address');
  },
};
