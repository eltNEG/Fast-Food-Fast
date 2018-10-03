import express from 'express';
import { loginUser, createUser } from '../controller/authController';


const authRoute = express.Router();

authRoute.route('/auth/signup').post(createUser);

//authRoute.route('/auth/login').post(loginUser);

export default authRoute;