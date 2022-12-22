"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const dbhelpers = {
    postUser: (req, callback) => __awaiter(void 0, void 0, void 0, function* () {
        const standardizedDate = new Date(req.body.dob);
        const localDate = standardizedDate.toLocaleDateString("en-US", { month: '2-digit', day: '2-digit', year: 'numeric' });
        const existingUser = yield index_1.default.query(`SELECT * FROM users WHERE email = '${req.body.email}';`);
        if (existingUser.rows.length > 0) {
            callback('email already exists');
            return;
        }
        index_1.default.query(`INSERT INTO users (name, email, dob) VALUES ('${req.body.name}', '${req.body.email}', '${localDate}') RETURNING *;`, (err, results) => {
            if (err) {
                callback(err);
            }
            else {
                callback(null, results);
            }
        });
    }),
    getUserById: (req, callback) => {
        console.log({ PARAMS: req.params });
        index_1.default.query(`SELECT * FROM users WHERE id = ${req.params.id};`, (err, results) => {
            if (err) {
                callback(err);
            }
            else {
                callback(null, results);
            }
        });
    },
    deleteUserById: (req, callback) => {
        index_1.default.query(`DELETE FROM users WHERE id = ${req.params.id};`, (err, results) => {
            if (err) {
                callback(err);
            }
            else {
                callback(null, results);
            }
        });
    }
};
exports.default = dbhelpers;
