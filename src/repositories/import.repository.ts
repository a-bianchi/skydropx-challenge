import { Import } from '../models/import.model';
import { ImportError } from '../models/importError.model';
import { CreateImportError } from '../types';
import { Transaction } from 'sequelize';

export class ImportRepository {
  public async createImport(transaction?: Transaction): Promise<Import> {
    return await Import.create({ transaction });
  }

  public async findOneImport(id: string): Promise<Import> {
    return await Import.findOne({ where: { id }, include: [{ model: ImportError }] });
  }

  public async remove(id: string): Promise<number> {
    return await Import.destroy({ where: { id } });
  }

  public async createImportError(importError: CreateImportError, transaction?: Transaction): Promise<ImportError> {
    return await ImportError.create(importError, { transaction });
  }
}
