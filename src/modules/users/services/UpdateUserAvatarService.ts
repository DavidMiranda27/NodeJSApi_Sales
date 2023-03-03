import path from "path";
import AppError from "@shared/errors/AppError";
import UserRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import uploadConfig from "@config/upload";
import fs from "fs";

interface IRequest {
  user_id: string;
  avatarFilename: string;
}


class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User | undefined> {
    const user = await UserRepository.findById(+user_id); // + converts string to number

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar); // path.join() joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath); // fs.promises.unlink() removes files and directories.
      }

      user.avatar = avatarFilename;
      await UserRepository.save(user);

      return user;
    }

    user.avatar = avatarFilename;
    await UserRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
