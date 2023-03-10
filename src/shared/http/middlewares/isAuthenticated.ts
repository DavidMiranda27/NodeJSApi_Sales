import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {

    const tokenDecoded = verify(token, authConfig.jwt.secret);

    const { sub } = tokenDecoded as ITokenPayload;

    request.user = {
      id: +sub, // + is a shortcut to convert a string to a number
    };

    return next();

  } catch {
    throw new AppError("Invalid JWT token");
  }

}
