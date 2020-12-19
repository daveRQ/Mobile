const jwt = require("jsonwebtoken");

let verificarToken = (req, res, next) => {
  let token = req.get("Authorization");//headers

  jwt.verify(token, "secret", (message, decoded) => {

    if (message) {
      return res.status(401).json({
        result: false,
        message
      });
    }

    req.nombre = decoded.nombre;

    next();
  });

};

module.exports = {
  verificarToken
}; 