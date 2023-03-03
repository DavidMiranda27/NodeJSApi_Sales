import CustomerRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import { OrderRepository } from "../typeorm/repositories/OrdersRepository";
import Order from "../typeorm/entities/Order";

interface IProduct {
  id: number;
  quantity: number;
}

interface ICreateOrder {
  customer_id: number;
  products: IProduct[];
}


class CreateOrderService {
  public async execute({ customer_id, products }: ICreateOrder): Promise<Order> {

    const customerExists = await CustomerRepository.findById(customer_id)
    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id');
    }

    const existsProducts = await ProductRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids');
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find product ${checkInexistentProducts[0].id}`);
    }

    const findProductsWithNoQuantityAvailable = products.filter(
      product => existsProducts.filter(p => p.id === product.id)[0].quantity < product.quantity,
    );

    if (findProductsWithNoQuantityAvailable.length) {
      throw new AppError(`The quantity ${findProductsWithNoQuantityAvailable[0].quantity} is not available for ${findProductsWithNoQuantityAvailable[0].id}`);
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await OrderRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;
    const orderedProductsQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity,
    }));

    await ProductRepository.save(orderedProductsQuantity);

    return order;
  }
}

export default CreateOrderService;



