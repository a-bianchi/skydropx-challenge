import { Table, Column, DataType, HasMany, BelongsTo, ForeignKey, HasOne, Model } from 'sequelize-typescript';
import Address from './address.model';
import Order from './order.model';
import Parcel from './parcel.model';

@Table({ tableName: 'shipment', underscored: true })
export default class Shipment extends Model<Shipment> {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Address)
  @Column({ type: DataType.INTEGER, allowNull: false })
  addressFromId: number;

  @ForeignKey(() => Address)
  @Column({ type: DataType.INTEGER, allowNull: false })
  addressToId: number;

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

  @BelongsTo(() => Address)
  addressFrom: Address;

  @BelongsTo(() => Address)
  addressTo: Address;

  @HasMany(() => Parcel)
  parcels: Parcel[];

  @HasOne(() => Order)
  order: Order;
}
