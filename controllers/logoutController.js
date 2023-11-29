import { wrapper } from "../middleware/wrapper.js";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const logOut = wrapper(async (req, res, next) => {
  await axios.get(`${process.env.BASE_URL}/logout`).then(() => {
    return res.redirect("/login")
  }).catch((err) => {
    return res.send(err);
  });
});

export { logOut };
