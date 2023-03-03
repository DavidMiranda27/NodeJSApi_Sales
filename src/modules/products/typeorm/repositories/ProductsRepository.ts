import AppDataSource from "src/data-source";
import { In } from "typeorm";
import Product from "../entities/Product";

interface IFindProducts {
  id: number;
}


export const ProductRepository = AppDataSource.getRepository(Product).extend({

  async findByName(name: string): Promise<Product | null> {
    const product = await this.findOne({ where: { name } });
    return product;
  },


  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);
    const existentProducts = await this.find({ where: { id: In(productIds) } });
    return existentProducts;
  },


});
