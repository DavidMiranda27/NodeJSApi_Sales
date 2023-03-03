import AppError from "@shared/errors/AppError";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({id}: IRequest): Promise<void> {
    const customer = await CustomerRepository.findById(+id);

    if (!customer) {
      throw new AppError("Customer not found.", 404);
    }

    await CustomerRepository.remove(customer);
  }
}

export default DeleteCustomerService;
