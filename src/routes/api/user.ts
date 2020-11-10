import { Router } from 'express';

// Controllers
import {
  getUserData,
  addConnection,
  acceptConnection,
  rejectConnection,
  sendVerificationSMS,
  verifyPhone,
} from '../../controllers/user.controller';

// Middlewares
import { auth } from '../../middlewares/auth.middleware';

const router: Router = Router();

router.route('/:userid').get(getUserData);

router.route('/connection/add/:userid').post(auth, addConnection);
router.route('/connection/accept/:userid').post(auth, acceptConnection);
router.route('/connection/reject/:userid').post(auth, rejectConnection);

router
  .route('/verify/phone')
  .get(auth, sendVerificationSMS)
  .post(auth, verifyPhone);

module.exports = router;
