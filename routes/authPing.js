import express from "express";
import jwtAuthenticator from "./../customMiddleware/jwtAuthenticator";
import jwt from "jsonwebtoken";

const authPingRoute = express.Router();

authPingRoute.route("/auth/ping").get((req, res) => {
  const token = jwt.sign({ a: "pong" }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });
  return res.status(200).json({
    success: true,
    message: "pong",
    token: token
  });
});

authPingRoute
  .use(jwtAuthenticator)
  .route("/auth/ping")
  .post((req, res) => {
    const { decoded } = req;
    return res.status(200).json({
      success: true,
      message: decoded.a
    });
  });

export default authPingRoute;
