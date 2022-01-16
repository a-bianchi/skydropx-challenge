import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript';
import { literal } from 'sequelize';
import { Import } from './import.model';

@Table({ tableName: 'import_error', underscored: true })
export class ImportError extends Model<ImportError> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: literal('uuid_generate_v1()') })
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
