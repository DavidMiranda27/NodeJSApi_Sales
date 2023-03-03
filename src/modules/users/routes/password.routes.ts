import { Router } from "express";
import ForgotPasswordController from "../controllers/ForgotPasswordController";
import ResetPasswordController from "../controllers/ResetPasswordController";
import { celebrate, Joi, Segments } from "celebrate";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  }
}), forgotPasswordController.create);

passwordRouter.post('/reset', celebrate({
  [Segments.BODY]: {
    token: Joi.string().required(),
    newPassword: Joi.string().required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('newPassword')),
  }
}), resetPasswordController.create);

export default passwordRouter;
