const jwt = require('jsonwebtoken');

function isAuthorized (req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
      // retrieve the authorization header and parse out the JWT using the split function
      let token = req.headers.authorization.split(" ")[1];
      // Here we validate that the JSON Web Token is valid
      jwt.verify(token, 'my_secret_key', (err, payload) => {
      if (err) {
      res.status(401).json({ error: "Not Authorized" });
      }
      req.user = payload; // allow to use the user id in the controller
      console.log(req.user);
      return next(); }); }
  }
module.exports = {
  isAuthorized,
};