import express from 'express';
import controller from '../controller/user';
import { validateCreateUser, validateUserById } from '../middleware';

const router = express.Router();

router.route('/').get(controller.healthcheck)
router.route('/users').post(validateCreateUser, controller.postUser)
router.route('/users/:id').get(validateUserById, controller.getUserById)
router.route('/users/:id').delete(validateUserById, controller.deleteUserById)

export default router