import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('import', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      status: {
        allowNull: true,
        defaultValue: 'PENDING',
        type: DataTypes.ENUM,
        values: ['PENDING', 'PROCESSING', 'COMPLETED', 'ERROR'],
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
    await queryInterface.dropTable('imports');
  },
};
