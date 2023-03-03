import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {

    const productExists = await ProductRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name', 400);
    }

    const product = ProductRepository.create({
      name,
      price,
      quantity
    });

    await ProductRepository.save(product);

    return product;
  }
}

export default CreateProductService;
