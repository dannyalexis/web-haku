import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).send("Token requerido");
  }
  jwt.verify(token, process.env.TOKEN_KEY, (err, result) => {
    if (err) {
      return res.status(403).send("Token inválido");
    }
    req.datos = result;
    next();
  });
};
export default verifyToken;
