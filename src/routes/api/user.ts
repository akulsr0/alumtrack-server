import { Router } from 'express';
import { send } from 'process';

// Controllers
import {
  sendVerificationSMS,
  verifyPhone,
} from '../../controllers/user.controller';

// Middlewares
import { auth } from '../../middlewares/auth.middleware';

const router: Router = Router();

router
  .route('/verify/phone')
  .get(auth, sendVerificationSMS)
  .post(auth, verifyPhone);

module.exports = router;
