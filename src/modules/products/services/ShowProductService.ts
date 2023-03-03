import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: number;
}

class ShowProductService {

  public async execute({id}: IRequest): Promise<Product> {

    const product = await ProductRepository.findOne({ where: { id } });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;

  }

}


export default ShowProductService;
