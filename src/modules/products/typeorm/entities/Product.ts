import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import OrdersProducts from "../../../orders/typeorm/entities/OrdersProducts";

@Entity('products')
class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => OrdersProducts, (order_products) => order_products.product)
  order_products: OrdersProducts[];

}

export default Product;
