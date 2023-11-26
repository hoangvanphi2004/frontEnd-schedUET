import { wrapper } from "../middleware/wrapper.js";
import axios from "axios";

const authenticateMiddleware = wrapper(async (req, res, next) => {
  await axios
    .get("http://localhost:8000/checkAuth")
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
