checkAuth = (req, res, next) => {
  if (!req.user) {
    res.redirect("/");
  } else {
    next();
  }
}

module.exports = checkAuth;
