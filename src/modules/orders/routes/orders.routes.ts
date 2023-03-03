import { Router } from "express";
import OrderController from "../controllers/OrderController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Joi, Segments } from "celebrate";

const ordersRouter = Router();
const orderController = new OrderController();

ordersRouter.use(isAuthenticated);

ordersRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  orderController.show,
);

ordersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.number().required(),
      products: Joi.array().items(
        Joi.object().keys({
          id: Joi.number().required(),
          quantity: Joi.number().required(),
        }),
      ),
    },
  }),
  orderController.create,
);

export default ordersRouter;
