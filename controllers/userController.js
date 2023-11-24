import { wrapper } from "../middleware/wrapper.js";

const getSchedules = wrapper(async (req, res, next) => {
  res.render("user/schedule");
});

const getMaterials = wrapper(async (req, res, next) => {
  res.render("user/material");
});

const getRegistrations = wrapper(async (req, res, next) => {
  res.render("user/registration");
});

export { getMaterials, getRegistrations, getSchedules };
