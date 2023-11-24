import express from "express";
import * as logOutController from "../controllers/logoutController.js";

const router = express.Router();

router.route("/").get(logOutController.logOut);

export default router;
