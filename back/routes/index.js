const { Router } = require("express");
const userRouter = require("./user_route.js");
const postRouter = require("./car_routes.js");

const appRouter = Router();

// Specifying particular Routers (chat or User Router) to handle separate routes
appRouter.use("/user", userRouter);
appRouter.use("/cars", postRouter);

module.exports = appRouter;
