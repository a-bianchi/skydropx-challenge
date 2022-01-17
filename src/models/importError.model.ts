import { Table, Column, DataType, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import Import from './import.model';

@Table({ tableName: 'import_error', underscored: true })
export default class ImportError extends Model<ImportError> {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Import)
  @Column({ type: DataType.UUID })
  importId: string;

  @Column({ type: DataType.INTEGER })
  line: number;

  @Column({ type: DataType.TEXT })
  error: string;

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
  @BelongsTo(() => Import)
  shipment: Import;
}
