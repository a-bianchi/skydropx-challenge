import Shipment from '../models/shipment.model';
import { CreateShipment } from '../types';
import { Transaction } from 'sequelize';

export class ShipmentRepository {
  public async createShipment(shipment: CreateShipment, transaction?: Transaction): Promise<Shipment> {
    return await Shipment.create(shipment, { transaction });
  }
}
