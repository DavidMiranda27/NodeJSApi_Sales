import Customer from "@modules/customers/typeorm/entities/Customer";
import AppDataSource from "src/data-source";
import Order from "../entities/Order";

interface IProduct {
  product_id: number;
  price: number;
  quantity: number;
}

interface ICreateOrder {
  customer: Customer;
  products: IProduct[];
}

export const OrderRepository = AppDataSource.getRepository(Order).extend({

  async findById(id: number): Promise<Order | null> {
    const order = await this.findOne({ where: { id }, relations: ['customer', 'order_products'] });
    return order;
  },

  async createOrder({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.create({ customer, order_products: products });
    await this.save(order);
    return order;
  }



});
