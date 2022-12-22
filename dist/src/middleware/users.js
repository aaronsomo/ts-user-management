"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserById = exports.validateCreateUser = void 0;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    name: joi_1.default.string(),
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    dob: joi_1.default.date()
});
const validateCreateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (!error) {
        next();
    }
    else {
        res.status(400).send(error);
    }
};
exports.validateCreateUser = validateCreateUser;
const validateUserById = (req, res, next) => {
    const numberSchema = joi_1.default.number();
    const { error, value } = numberSchema.validate(req.params.id);
    if (!error) {
        next();
    }
    else {
        res.status(400).send(error);
    }
};
exports.validateUserById = validateUserById;
