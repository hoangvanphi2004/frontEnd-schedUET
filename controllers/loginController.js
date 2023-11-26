import { wrapper } from "../middleware/wrapper.js";
import axios from "axios";

const logInFE = wrapper(async (req, res, next) => {
  res.render("login");
});

const logInBE = wrapper(async (req, res, next) => {
  const username = req.body.userID;
  const password = req.body.password;
  await axios
    .post("http://localhost:8000/login", {
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
