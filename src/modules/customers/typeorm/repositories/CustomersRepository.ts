import AppDataSource from "src/data-source";
import Customer from "../entities/Customer";

const CustomerRepository = AppDataSource.getRepository(Customer).extend({
  async findByName(name: string): Promise<Customer | null> {
    const customer = await this.findOne({ where: { name } });
    return customer;
  },

  async findById(id: number): Promise<Customer | null> {
    const customer = await this.findOne({ where: { id } });
    return customer;
  },

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.findOne({ where: { email } });
    return customer;
  }

});

export default CustomerRepository;
