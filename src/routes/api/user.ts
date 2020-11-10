import { Router } from 'express';

// Controllers
import {
  getUserData,
  sendVerificationSMS,
  verifyPhone,
} from '../../controllers/user.controller';

// Middlewares
import { auth } from '../../middlewares/auth.middleware';

const router: Router = Router();

router.route('/:userid').get(getUserData);

router
  .route('/verify/phone')
  .get(auth, sendVerificationSMS)
  .post(auth, verifyPhone);

module.exports = router;
