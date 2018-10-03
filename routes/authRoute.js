import express from 'express';
import { createUser } from '../controller/authController';


const authRoute = express.Router();

authRoute.route('/auth/signup').post(createUser);

// authRoute.route('/auth/login').post(loginUser);

export default authRoute;
