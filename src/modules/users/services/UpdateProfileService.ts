import UserRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcrypt";


interface IRequest {
  user_id: number;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({ user_id, name, email, password, old_password,}: IRequest): Promise<User> {
    const user = await UserRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    const userUpdateEmail = await UserRepository.findByEmail(email);
    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError("There is already one user with this email.", 400);
    }

    if (password && !old_password) {
      throw new AppError("You need to inform the old password to set a new password.", 400);
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError("Old password does not match.", 400);
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await UserRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
