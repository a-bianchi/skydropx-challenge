import { ImportRepository } from '../repositories/import.repository';
import { OrderRepository } from '../repositories/order.repository';
import { ShipmentRepository } from '../repositories/shipment.repository';
import { ParcelRepository } from '../repositories/parcel.repository';
import { AddressRepository } from '../repositories/address.repository';
import { writeFile } from 'fs/promises';
import os from 'os';
import { MimeTypes, FileImporterFactory } from './import-services/file-processor.factory';
import { sequelize } from '../models/db';
import { ImportErrorMessagesDto } from '../dtos/importError.dto';
import ImportError from '../models/importError.model';
import { Order } from '../dtos/order.dto';
import Import from '../models/import.model';
import { ConvertOrder, CreateAddress, CreateParcel, ErrorDetails, Status } from '../types';
import { HttpNotFound } from '../libraries/httpErrors';
import { ImportStatusResponse } from '../dtos/import-status-response.dto';

export class ImportService {
  private importRepository = new ImportRepository();
  private orderRepository = new OrderRepository();
  private shipmentRepository = new ShipmentRepository();
  private parcelRepository = new ParcelRepository();
  private addressRepository = new AddressRepository();

  async storeImportFile(buffer: Buffer, fileName: string): Promise<void> {
    await writeFile(`${os.tmpdir()}/${fileName}`, buffer);
  }

  private async processFile(fileName: string, mimetype: MimeTypes): Promise<void> {
    const fileProcessor = FileImporterFactory.getFileImporter(mimetype);
    fileProcessor.importFile(fileName);
  }

  private convertOrder(orderDto: Order): ConvertOrder {
    const addressFrom: CreateAddress = {
      name: orderDto.address_from_name,
      email: orderDto.address_from_email,
      street: orderDto.address_from_street1,
      city: orderDto.address_from_city,
      province: orderDto.address_from_province,
      postalCode: orderDto.address_from_postal_code,
      countryCode: orderDto.address_from_country_code,
    };

    const addressTo: CreateAddress = {
      name: orderDto.address_to_name,
      email: orderDto.address_to_email,
      street: orderDto.address_to_street1,
      city: orderDto.address_to_city,
      province: orderDto.address_to_province,
      postalCode: orderDto.address_to_postal_code,
      countryCode: orderDto.address_to_country_code,
    };

    const parcel: CreateParcel = {
      length: orderDto.parcel_length,
      width: orderDto.parcel_width,
      height: orderDto.parcel_height,
      dimensionsUnit: orderDto.parcel_dimensions_unit,
      weight: orderDto.parcel_weight,
      weightUnit: orderDto.parcel_weight_unit,
    };

    const order = { reference: orderDto.order_reference };

    return { addressFrom, addressTo, parcel, order };
  }

  public async createImport(file: Buffer, mimetype: string): Promise<string> {
    const transaction = await sequelize.transaction();
    try {
      const importEntity = await this.importRepository.createImport(transaction);
      await this.storeImportFile(file, importEntity.id);
      await this.processFile(importEntity.id, mimetype as MimeTypes);
      await transaction.commit();
      return importEntity.id;
    } catch (error) {
      await transaction.rollback();
      console.error('ERROR: create import ', error);
      throw error;
    }
  }

  public async storeErrors(importId: string, lineNumber: number, prettyErrors: ImportErrorMessagesDto[]): Promise<ImportError[]> {
    const importErrors = prettyErrors.map((error) => {
      return {
        error: error.toString(),
        importId: importId,
        line: lineNumber,
      };
    });
    return this.importRepository.createImportErrors(importErrors);
  }

  public async createOrder(orderDto: Order): Promise<string> {
    const transaction = await sequelize.transaction();
    try {
      const { addressTo, addressFrom, parcel, order } = this.convertOrder(orderDto);
      const { id: addressToId } = await this.addressRepository.createAddress(addressTo, transaction);
      const { id: addressFromId } = await this.addressRepository.createAddress(addressFrom, transaction);

      const { id: shipmentId } = await this.shipmentRepository.createShipment({ addressToId, addressFromId }, transaction);

      parcel.shipmentId = shipmentId;
      await this.parcelRepository.createParcel(parcel, transaction);

      order.shipmentId = shipmentId;
      const { id: orderId } = await this.orderRepository.createOrder(order, transaction);

      await transaction.commit();
      return orderId;
    } catch (error) {
      await transaction.rollback();
      console.error('ERROR: create order ', error);
      throw error;
    }
  }

  public async getOneImport(id: string): Promise<ImportStatusResponse> {
    const importStatus = await this.importRepository.findOneImport(id);

    const errors: ErrorDetails[] = [];

    if (!importStatus) throw new HttpNotFound('IMPORT_NOT_FOUND');

    if (importStatus.status === Status.ERROR) {
      // don't return errors until status is not ERRORS
      importStatus.errors.forEach((error) => {
        errors.push({
          lineNumber: error.line,
          error: JSON.parse(error.error),
        });
      });
    }

    return {
      importId: id,
      status: importStatus.status,
      errors,
    };
  }

  public async markImportProcessed(id: string): Promise<Import[]> {
    return this.importRepository.updateImport(id, { status: Status.PROCESSING });
  }

  public async markImportFailed(id: string): Promise<Import[]> {
    return this.importRepository.updateImport(id, { status: Status.ERROR });
  }

  public async markImportSuccess(id: string): Promise<Import[]> {
    return this.importRepository.updateImport(id, { status: Status.COMPLETED });
  }
}
