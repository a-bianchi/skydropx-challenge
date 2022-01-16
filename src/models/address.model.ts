import { Table, Column, DataType, HasMany, Model } from 'sequelize-typescript';
import { Shipment } from './shipment.model';

@Table({ tableName: 'address', underscored: true })
export class Address extends Model<Address> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  street: string;

  @Column({ type: DataType.STRING, allowNull: false })
  city: string;

  @Column({ type: DataType.STRING, allowNull: false })
  province: string;

  @Column({ type: DataType.NUMBER, allowNull: false })
  postalCode: number;

  @Column({ type: DataType.STRING, allowNull: false })
  countryCode: string;

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

  @HasMany(() => Shipment)
  shipments: Shipment[];
}
