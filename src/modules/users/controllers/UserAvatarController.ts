import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const avatarName =  request.file?.filename ? request.file.filename : "file"; // if request.file.filename exists, then use it, otherwise use an empty string

    const user = await updateUserAvatarService.execute({
      user_id:  String(request.user.id),
      avatarFilename: avatarName,
    });

    return response.json(user);
  }
}
