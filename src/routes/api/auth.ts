import { Router } from 'express';

import {
  getCurrentUser,
  registerUser,
  loginUser,
} from '../../controllers/auth.controller';

const router: Router = Router();

router.route('/').get(getCurrentUser).post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;
