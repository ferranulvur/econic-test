const jwt = require("jsonwebtoken");

// generating access token
exports.generateAccessToken = (user = {}) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};
