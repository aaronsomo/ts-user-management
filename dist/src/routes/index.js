"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controller/user"));
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
router.route('/').get(user_1.default.healthcheck);
router.route('/users').post(middleware_1.validateCreateUser, user_1.default.postUser);
router.route('/users/:id').get(middleware_1.validateUserById, user_1.default.getUserById);
router.route('/users/:id').delete(middleware_1.validateUserById, user_1.default.deleteUserById);
exports.default = router;
