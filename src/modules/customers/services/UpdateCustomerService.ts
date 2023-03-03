import AppError from "@shared/errors/AppError";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";
import Customer from "../typeorm/entities/Customer";


interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({id, name, email}: IRequest): Promise<Customer> {
    const customer = await CustomerRepository.findById(+id);

    if (!customer) {
      throw new AppError("Customer not found.", 404);
    }

    const customerExists = await CustomerRepository.findByEmail(email);

    if (customerExists && customerExists.id !== +id) {
      throw new AppError("There is already one customer with this email.", 400);
    }

    customer.name = name;
    customer.email = email;

    await CustomerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
