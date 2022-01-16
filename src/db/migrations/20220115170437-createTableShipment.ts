import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('shipment', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      addressFromId: {
        type: DataTypes.INTEGER,
        field: 'address_from_id',
        references: {
          model: 'address',
          key: 'id',
        },
      },
      addressToId: {
        type: DataTypes.INTEGER,
        field: 'address_to_id',
        references: {
          model: 'address',
          key: 'id',
        },
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
    await queryInterface.dropTable('shipment');
  },
};
