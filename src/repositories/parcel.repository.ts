import Parcel from '../models/parcel.model';
import { CreateParcel } from '../types';
import { Transaction } from 'sequelize';

export class ParcelRepository {
  public async createParcel(parcel: CreateParcel, transaction?: Transaction): Promise<Parcel> {
    return await Parcel.create(parcel, { transaction });
  }
}
