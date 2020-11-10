import { Router } from 'express';

// Controllers
import {
  getUserProjects,
  addProject,
} from '../../controllers/project.controller';

// Middlewares
import { auth } from '../../middlewares/auth.middleware';

const router: Router = Router();

router.route('/').get(getUserProjects).post(auth, addProject);

module.exports = router;
