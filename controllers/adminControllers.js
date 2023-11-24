import { wrapper } from "../middleware/wrapper.js";
import axios from "axios";

const getAccounts = wrapper(async (req, res, next) => {
  res.render("admin/account");
});

const getCourses = wrapper(async (req, res, next) => {
  res.render("admin/course");
});

const getMaterials = wrapper(async (req, res, next) => {
  res.render("admin/material");
});

const getSections = wrapper(async (req, res, next) => {
  res.render("admin/section");
});

const getTeachers = wrapper(async (req, res, next) => {
  res.render("admin/teacher");
});

export { getAccounts, getCourses, getMaterials, getSections, getTeachers };
