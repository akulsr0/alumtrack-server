import { Router } from 'express';

// Controllers
import {
  getCurrentUser,
  registerUser,
  loginUser,
} from '../../controllers/auth.controller';

// Middlewares
import { auth } from '../../middlewares/auth.middleware';

const router: Router = Router();

router.route('/').get(auth, getCurrentUser).post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;
