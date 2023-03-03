import AppError from "@shared/errors/AppError";
import { OrderRepository } from "../typeorm/repositories/OrdersRepository";
import Order from "../typeorm/entities/Order";

interface IProduct {
  id: number;
}

class ShowOrderService {
  public async execute({id}: IProduct): Promise<Order> {
    const order = await OrderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found');
    }

    return order;
  }
}

export default ShowOrderService;
