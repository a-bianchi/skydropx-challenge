import { Table, Column, DataType, BelongsTo, ForeignKey, Model } from 'sequelize-typescript';
import Shipment from './shipment.model';

@Table({ tableName: 'parcel', underscored: true })
export default class Parcel extends Model<Parcel> {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Shipment)
  @Column({ type: DataType.BIGINT, allowNull: false })
  shipmentId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  length: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  width: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  height: number;

  @Column({ type: DataType.STRING, allowNull: false })
  dimensionsUnit: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  weight: number;

  @Column({ type: DataType.STRING, allowNull: false })
  weightUnit: string;

  /**
   * CREATED_AT & UPDATED_AT
   */

  @Column({ type: DataType.DATE })
  createdAt: Date;

  @Column({ type: DataType.DATE })
  updatedAt: Date;

  /**
   * RELATIONS
   */

  @BelongsTo(() => Shipment)
  shipment: Shipment;
}
