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
      console.log("response from be after log in");
      console.log(result.data);
      if (result.data.loggedIn == 0) return res.redirect("/login");
      console.log("Logged in");
      return res.redirect("/");
    })
    .catch((err) => {
      return res.redirect("/login");
    });

  res.send("haha");
});

export { logInFE, logInBE };
