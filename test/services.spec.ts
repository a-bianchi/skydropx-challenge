import * as fs from 'fs';
import { join } from 'path';
import { ImportRepository } from '../src/repositories/import.repository';
import { ImportService } from './../src/services/import.service';
import { OrderRepository } from './../src/repositories/order.repository';
import { Status } from './../src/types';
const { readFile } = fs.promises;

const file = 'shipments_data.csv';
const importService = new ImportService();
const orderRepository = new OrderRepository();
const importRepository = new ImportRepository();

const parseAndExtractData = async function (file: string): Promise<string> {
  const path = join(__dirname, `__resources__/${file}`);
  const csv = await readFile(path, 'utf8');

  return csv;
};

describe('Test services', () => {
  describe(`Import create and delete`, () => {
    it(`should id string`, async () => {
      const importEntity = await importRepository.createImport();
      expect(importEntity.id.toString().length).toBe(36);
      const importRemove = await importRepository.remove(importEntity.id);
      expect(importRemove).toBe(1);
    });
  });

  describe(`Import update status`, () => {
    it(`should change status`, async () => {
      const importEntity = await importRepository.createImport();
      expect(importEntity.id.toString().length).toBe(36);
      expect(importEntity.status).toBe(Status.PENDING);

      const importProcessed = await importService.markImportProcessed(importEntity.id);
      expect(importProcessed[0].status).toBe(Status.PROCESSING);
      const importFailed = await importService.markImportFailed(importEntity.id);
      expect(importFailed[0].status).toBe(Status.ERROR);
      const importSuccess = await importService.markImportSuccess(importEntity.id);
      expect(importSuccess[0].status).toBe(Status.COMPLETED);

      const importRemove = await importRepository.remove(importEntity.id);
      expect(importRemove).toBe(1);
    });
  });

  describe(`Create order`, () => {
    it(`should create and delete order`, async () => {
      const orderId = await importService.createOrder({
        lineNumber: 1,
        order_reference: 'OR00001',
        address_from_name: 'Fernando López',
        address_from_email: 'fernando@example.com',
        address_from_street1: 'Av. Principal #123',
        address_from_city: 'Azcapotzalco',
        address_from_province: 'Ciudad de México',
        address_from_postal_code: 2900,
        address_from_country_code: 'MX',
        address_to_name: 'Isabel Arredondo',
        address_to_email: 'isabel@example.com',
        address_to_street1: 'Av. las torres #123',
        address_to_city: 'Puebla',
        address_to_province: 'Puebla',
        address_to_postal_code: 72450,
        address_to_country_code: 'MX',
        parcel_length: 40,
        parcel_width: 40,
        parcel_height: 40,
        parcel_dimensions_unit: 'CM',
        parcel_weight: 5,
        parcel_weight_unit: 'KG',
      });

      const importRemove = await orderRepository.remove(orderId);
      expect(importRemove).toBe(1);
    });
  });
});
