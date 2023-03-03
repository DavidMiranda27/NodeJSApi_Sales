import AppError from "@shared/errors/AppError";
import UserRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";

interface IRequest {
  user_id: number;
}

class ShowProfileService {

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await UserRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    return user;

  }
}

export default ShowProfileService;
