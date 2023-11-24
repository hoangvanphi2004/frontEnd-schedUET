import express from "express";
import * as homeControllers from "../controllers/homeControllers.js"

const router = express.Router();

router.route("/").get(homeControllers.getHomePage);

export default router;
