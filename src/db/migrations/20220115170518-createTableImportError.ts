import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('import_error', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      importId: {
        type: DataTypes.UUID,
        field: 'import_id',
        references: {
          model: 'import',
          key: 'id',
        },
      },
      line: { allowNull: false, type: DataTypes.INTEGER },
      error: { allowNull: false, type: DataTypes.TEXT },
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
    await queryInterface.dropTable('imports_error');
  },
};
