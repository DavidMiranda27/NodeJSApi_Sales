import AppError from "@shared/errors/AppError";
import UserRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import { hash } from "bcrypt";


interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {

    const emailExists = await UserRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("Email address already used.", 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = UserRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await UserRepository.save(user);

    return user;
  }
}

export default CreateUserService;
