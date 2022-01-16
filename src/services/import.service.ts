import { Import } from '../models/import.model';
import { ImportRepository } from '../repositories/import.repository';
import { db } from '../config/initCoreModule';
import { Transaction } from 'sequelize';

export class ImportService {
  private importRepository = new ImportRepository();

  private async processFile(): Promise<void> {
    console.log('processFile');
  }

  public async createImport(file: unknown): Promise<Import> {
    const transaction = await db.transaction();
    try {
      const importResponse = await this.importRepository.createImport(transaction);

      this.processFile().then();

      return importResponse;
    } catch (error) {
      await transaction.rollback();
      console.error('ERROR: create import ', error);
      throw error;
    }
  }
}
