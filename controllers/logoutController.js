import { wrapper } from "../middleware/wrapper.js";
import axios from "axios";

const logOut = wrapper(async (req, res, next) => {
  await axios.get("http://localhost:8000/logout").then(() => {
    return res.redirect("/login")
  }).catch((err) => {
    return res.send(err);
  });
});

export { logOut };
