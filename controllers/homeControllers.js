import { wrapper } from "../middleware/wrapper.js";

const getHomePage = wrapper(async (req, res, next) => {
  if (global.account.isAdmin == 0) res.redirect("/user");
  else res.redirect("/admin");
});

export { getHomePage };
