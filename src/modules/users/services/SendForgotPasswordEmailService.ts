import AppError from "@shared/errors/AppError";
import UserTokenRepository from "../typeorm/repositories/UserTokensRepository";
import UserRepository from "../typeorm/repositories/UsersRepository";
import { sign } from "jsonwebtoken";
import path from "path";
import forgotConfig from "@config/forgotPass";
import  EtherealMail from "@config/Mail/EtherealMail";

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists.", 401);
    }

    const tokenGenerated = sign({}, forgotConfig.jwt.secret, {
      subject: String(user.id),
      expiresIn: forgotConfig.jwt.expiresIn,
    });


    const token  = await UserTokenRepository.generateToken(user.id, tokenGenerated);

    console.log(token);

    const forgotPasswordTemplate = path.resolve(__dirname, "..", "views", "forgot_password.hbs");

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: "[API Vendas] Recuperação de senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3333/reset_password?token=${tokenGenerated}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
