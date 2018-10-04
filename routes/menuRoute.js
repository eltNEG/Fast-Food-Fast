import express from 'express';
import menuController from '../controller/menuController';

import jwtAuthenticator from '../customMiddleware/jwtAuthenticator';
import onlyAdmin from '../customMiddleware/onlyAdmin';

const menuRoute = express.Router();

menuRoute
  .route('/menu')
  .get(menuController.getMenu)
  .post(jwtAuthenticator, onlyAdmin, menuController.postMenu);

export default menuRoute;
