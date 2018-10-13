import express from 'express';
import { loginUser, createUser } from '../controller/authController';
import validate from '../customMiddleware/validator';


const authRoute = express.Router();

authRoute.route('/auth/signup').post(validate, createUser);

authRoute.route('/auth/login').post(validate, loginUser);

export default authRoute;
