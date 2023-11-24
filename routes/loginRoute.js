import express from "express";
import * as loginController from "../controllers/loginController.js";

const router = express.Router();

router.route("/").get(loginController.logInFE).post(loginController.logInBE);



export default router;
