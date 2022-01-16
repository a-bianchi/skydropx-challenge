import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript';
import { literal } from 'sequelize';
import { ImportError } from './importError.model';

const enum Status {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

@Table({ tableName: 'import', underscored: true })
export class Import extends Model<Import> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: literal('uuid_generate_v1()') })
  id: string;

  @Column({ type: DataType.ENUM, defaultValue: Status.PENDING })
  status: Status;

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
  @HasMany(() => ImportError)
  errors: ImportError[];
}
