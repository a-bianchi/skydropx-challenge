import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('parcel', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      shipmentId: {
        type: DataTypes.BIGINT,
        field: 'shipment_id',
        references: {
          model: 'shipment',
          key: 'id',
        },
      },
      parcelLength: {
        type: DataTypes.INTEGER,
        field: 'length',
      },
      parcelWidth: {
        type: DataTypes.INTEGER,
        field: 'width',
      },
      parcelHeight: {
        type: DataTypes.INTEGER,
        field: 'height',
      },
      parcelDimensionsUnit: {
        type: DataTypes.STRING,
        field: 'dimensions_unit',
      },
      parcelWeight: {
        type: DataTypes.INTEGER,
        field: 'weight',
      },
      parcelWeightUnit: {
        type: DataTypes.STRING,
        field: 'weight_unit',
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
