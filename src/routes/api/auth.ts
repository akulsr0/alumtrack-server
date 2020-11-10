import { Router } from 'express';

// Controllers
import {
  getCurrentUser,
  registerUser,
  loginUser,
} from '../../controllers/auth.controller';

// Middlewares
import { authCookie } from '../../middlewares/auth.middleware';

const router: Router = Router();

router.route('/').get(authCookie, getCurrentUser).post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;
