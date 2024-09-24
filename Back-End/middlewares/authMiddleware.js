// decode the token and get user details middlewere
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.userId;
    req.role = verified.role;
    console.log("req.user: ", req.user);
    console.log("req.role: ", req.role);

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};

module.exports = auth;