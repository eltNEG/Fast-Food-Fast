import express from 'express';
import menuController from '../controller/menuController';

import jwtAuthenticator from '../customMiddleware/jwtAuthenticator';
import onlyAdmin from '../customMiddleware/onlyAdmin';
import validate from '../customMiddleware/validator';

const menuRoute = express.Router();

menuRoute
  .route('/menu')
  .get(menuController.getMenu)
  .post(jwtAuthenticator, onlyAdmin, validate, menuController.postMenu);

menuRoute
  .route('/menu/:foodId')
  .put(jwtAuthenticator, onlyAdmin, validate, menuController.updateMenu)
  .delete(jwtAuthenticator, onlyAdmin, validate, menuController.deleteMenu);

export default menuRoute;
