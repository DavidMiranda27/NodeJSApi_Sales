import AppError from "@shared/errors/AppError";
import UserTokenRepository from "../typeorm/repositories/UserTokensRepository";
import UserRepository from "../typeorm/repositories/UsersRepository";
import { isAfter, addHours } from "date-fns";
import  { hash } from "bcrypt";

interface IRequest {
  token: string;
  newPassword: string;
}

class ResetPasswordService {
  public async execute({ token, newPassword }: IRequest): Promise<void> {
    const userToken = await UserTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("User token does not exists.", 401);
    }

    const user = await UserRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("User does not exists.", 401);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired.", 400);
    }

    user.password = await hash(newPassword, 8);

    await UserRepository.save(user);
  }
}

export default ResetPasswordService;
