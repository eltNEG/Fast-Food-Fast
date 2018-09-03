"use strict";
import express from "express";

const pingRoute = express.Router()

const pingController = (req, res, next) => res.send("pong")

pingRoute.route("/ping").get(pingController)

export default pingRoute