const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
      if (decoded) {
        req.userId = decoded.userId;
        req.name = decoded.userName;
        next();
      } else {
        res.status(500).send({ msg: "please log in" });
      }
    });
  } else {
    res.status(500).send({ msg: "please log in" });
  }
};

module.exports = authMiddleware;
