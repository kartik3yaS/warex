const jwt = require("jsonwebtoken");

const jwtConfig = {
  secret: process.env.JWT_SECRET || "your_jwt_secret_key_here",
  expiresIn: "30d",
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.secret);
  } catch (error) {
    return null;
  }
};

module.exports = {
  jwtConfig,
  generateToken,
  verifyToken,
};
