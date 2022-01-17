import { Table, Column, DataType, BelongsTo, ForeignKey, Model } from 'sequelize-typescript';
import { literal } from 'sequelize';
import Shipment from './shipment.model';

@Table({ tableName: 'order', underscored: true })
export default class Order extends Model<Order> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: literal('uuid_generate_v1()') })
  id: string;

  @ForeignKey(() => Shipment)
  @Column({ type: DataType.BIGINT, allowNull: false })
  shipmentId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  reference: string;

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
