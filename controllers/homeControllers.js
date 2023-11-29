import { wrapper } from "../middleware/wrapper.js";

const getHomePage = wrapper(async (req, res, next) => {
  if (!global.account) {
    return res.redirect("/login");
  } else {
    if (global.account.isAdmin == 0) {
      return res.redirect("/user");
    } else {
      return res.redirect("/admin");
    }
  }
});

export { getHomePage };
