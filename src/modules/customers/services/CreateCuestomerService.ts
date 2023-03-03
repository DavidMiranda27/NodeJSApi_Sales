import AppError from "@shared/errors/AppError";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";
import Customer from "../typeorm/entities/Customer";


interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerExists = await CustomerRepository.findByEmail(email);
    if (customerExists) {
      throw new AppError("Email address already used.", 400);
    }

    const customer = CustomerRepository.create({ name, email });
    await CustomerRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
