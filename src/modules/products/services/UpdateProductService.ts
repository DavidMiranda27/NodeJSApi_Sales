import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({id, name, price, quantity }: IRequest): Promise<Product> {

    const product = await ProductRepository.findOne({ where: { id } });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const productNameExists = await ProductRepository.findByName(name);

    if (productNameExists && name !== product.name) {
      throw new AppError('There is already one product with this name', 400);
    }

    ProductRepository.update(id, {
      name,
      price,
      quantity,
    });

    await ProductRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
