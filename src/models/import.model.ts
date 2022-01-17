import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript';
import { literal } from 'sequelize';
import ImportError from './importError.model';
import { Status } from '../types';

@Table({ tableName: 'import', underscored: true })
export default class Import extends Model<Import> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: literal('uuid_generate_v1()') })
  id: string;

  @Column({
    type: DataType.ENUM,
    values: [Status.COMPLETED, Status.ERROR, Status.PENDING, Status.PROCESSING],
    defaultValue: Status.PENDING,
  })
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
