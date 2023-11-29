import { wrapper } from "../middleware/wrapper.js";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const authenticateMiddleware = wrapper(async (req, res, next) => {
  await axios
    .get(`${process.env.BASE_URL}/checkAuth`)
    .then((result) => {
      global.account = result.data;
    })
    .catch((err) => {
      console.log("cannot connect");
      res.redirect("/login");
    });
    next();
});

export { authenticateMiddleware };
