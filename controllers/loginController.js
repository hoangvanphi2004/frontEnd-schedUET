import { wrapper } from "../middleware/wrapper.js";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const logInFE = wrapper(async (req, res, next) => {
  res.render("login");
});

const logInBE = wrapper(async (req, res, next) => {
  const username = req.body.userID;
  const password = req.body.password;
  await axios
    .post(`${process.env.BASE_URL}/login`, {
      userID: username,
      password: password,
    })
    .then((result) => {
      if (result.data.loggedIn == 0) return res.redirect("/login");
      return res.redirect("/");
    })
    .catch((err) => {
      return res.redirect("/login");
    });
});

export { logInFE, logInBE };
