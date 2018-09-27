import jwt from "jsonwebtoken";

const jwtAuthenticator = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers.authorization;
  if (token) {
    if (token.startsWith("Bearer")) {
      token = token.slice(7);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
            success: false,
            message: 'Invalid token'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({
        success: false,
        message: 'No authorization token provided'
    });
  }
};

export default jwtAuthenticator
