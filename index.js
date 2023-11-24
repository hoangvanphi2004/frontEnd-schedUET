import express from "express";

const app = express();

//import routes
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";
import loginRouter from "./routes/loginRoute.js";
import logoutRouter from "./routes/logoutRoute.js";
import homeRouter from "./routes/homeRoute.js";

//import middleware
import { authenticateMiddleware } from "./middleware/authenticateMiddleware.js";
import * as checkRolesMiddleware from "./middleware/checkRoles.js";

//set view engine
app.set("view engine", "ejs");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//add login route
app.use("/login", loginRouter);

//authenticate
app.use(authenticateMiddleware);

//add routes
app.use("/", homeRouter);
app.use("/admin", checkRolesMiddleware.isAdmin, adminRouter);
app.use("/user", checkRolesMiddleware.isUser, userRouter);
app.use("/logout", logoutRouter);

app.listen(8001, () => {
  console.log("listening on port 8001");
});
