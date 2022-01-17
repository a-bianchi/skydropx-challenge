import Address from '../models/address.model';
import { CreateAddress } from '../types';
import { Transaction } from 'sequelize';

export class AddressRepository {
  public async createAddress(address: CreateAddress, transaction?: Transaction): Promise<Address> {
    return await Address.create(address, { transaction });
  }
}
