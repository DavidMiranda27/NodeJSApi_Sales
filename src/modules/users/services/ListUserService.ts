import AppError from "@shared/errors/AppError";
import UserRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";


class ListUserService {
  public async execute(): Promise<User[]> {

    const users = await UserRepository.find();

    if (!users) {
      throw new AppError("No users found.", 400);
    }

    return users;
  }
}

export default ListUserService;
