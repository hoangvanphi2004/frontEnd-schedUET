import { wrapper } from "../middleware/wrapper.js";
import axios from "axios";

const logOut = wrapper(async (req, res, next) => {
  await axios.get("http://localhost:8000/logout");
  res.redirect("/login");
});

export { logOut };
