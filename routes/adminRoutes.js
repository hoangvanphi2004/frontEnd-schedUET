import express from "express";
import * as adminController from "../controllers/adminControllers.js";

const router = express.Router();

router.route("/").get((req, res, next) => {
  res.redirect("/admin/courses");
});

router.route("/courses").get(adminController.getCourses);

router.route("/accounts").get(adminController.getAccounts);

router.route("/materials").get(adminController.getMaterials);

router.route("/sections").get(adminController.getSections);

router.route("/teachers").get(adminController.getTeachers);

export default router;
