import { Order } from '../models/order.model';
import { CreateOrder } from '../types';
import { Transaction } from 'sequelize';

export class OrderRepository {
  public async createOrder(order: CreateOrder, transaction?: Transaction): Promise<Order> {
    return await Order.create(order, { transaction });
  }
}
