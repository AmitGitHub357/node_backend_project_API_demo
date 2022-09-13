const User = require("../models/userModel");
const authenticate = (req, res, next) => {
  let token = req.headers.auth;
  User.findByToken(token)
    .then((user) => {
      if (!user) {
        res.send({
            notice: "You have sent invalid token.",
            status: 401,
            success: false,
          })
          .status(401);
      } else {
        
        console.log(req.user, user);
        req.user = user;
        req.token = token;
        next();
      }
    })
    .catch((err) => {
      res.status(401).send({
        notice: "Token invalid.",
        status: 401,
        success: false,
        error: err.message,
      });
    });
};

module.exports = { authenticate };

