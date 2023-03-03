import CustomerRepository from "../typeorm/repositories/CustomersRepository";
import Customer from "../typeorm/entities/Customer";



class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customers = await CustomerRepository.find();
    return customers;
  }
}

export default ListCustomerService;
