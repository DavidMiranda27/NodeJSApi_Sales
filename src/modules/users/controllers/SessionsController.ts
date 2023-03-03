import { Request, Response } from "express";
import CreateSesseionsService from "../services/CreateSesseionsService";


export default class SessionsController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSesseions = new CreateSesseionsService();

    const { user, token } = await createSesseions.execute({ email, password });

    return response.json({ user, token });
  }
}
