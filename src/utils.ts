const jwt = require("jsonwebtoken");

export const generateToken = (body: Object) => {
  const token = jwt.sign(body, process.env.JWT_PRIVATE_KEY);
  return token;
};
