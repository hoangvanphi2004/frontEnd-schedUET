import { wrapper } from "../middleware/wrapper.js";

const isAdmin = wrapper(async (req, res, next) => {
  if (global.account.isAdmin == 1) return next();
  res.redirect("/user");
});

const isUser = wrapper(async (req, res, next) => {
    if (global.account.isAdmin == 0) return next();
    res.redirect("/admin");
  });

export { isAdmin, isUser };
