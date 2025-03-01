const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res
    .status(403)
    .json({ message: "Access denied. Admin role required." });
};

const isUser = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    return next();
  }
  return res
    .status(403)
    .json({ message: "Access denied. User role required." });
};

module.exports = { isAdmin, isUser };
