import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.route("/").get((req, res, next) => {
  res.redirect("/user/schedules");
});

router.route("/registrations").get(userController.getRegistrations);

router.route("/schedules").get(userController.getSchedules);

router.route("/materials").get(userController.getMaterials);

export default router;
