import AppError from "@shared/errors/AppError";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";
import Customer from "../typeorm/entities/Customer";

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({id}: IRequest): Promise<Customer> {

    const customerId = +id;
    const customer = await CustomerRepository.findById(customerId);

    if (!customer) {
      throw new AppError("Customer not found.", 404);
    }

    return customer;
  }
}

export default ShowCustomerService;
