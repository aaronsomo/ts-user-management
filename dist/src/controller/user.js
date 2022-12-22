"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbhelpers_1 = __importDefault(require("../../database/dbhelpers"));
const controller = {
    healthcheck: (req, res) => {
        res.status(200).send('health check is good');
    },
    postUser: (req, res) => {
        dbhelpers_1.default.postUser(req, (err, results) => {
            if (err) {
                console.log({ err });
                res.status(400).send({ error: 'email already exists' });
            }
            else {
                res.status(200).send(results);
            }
        });
    },
    getUserById: (req, res) => {
        dbhelpers_1.default.getUserById(req, (err, results) => {
            if (err) {
                console.log({ err });
                res.status(400).send(results);
            }
            else {
                res.status(200).send(results);
            }
        });
    },
    deleteUserById: (req, res) => {
        dbhelpers_1.default.deleteUserById(req, (err, results) => {
            if (err) {
                console.log({ err });
                res.status(400).send(results);
            }
            else {
                res.status(200).send(results);
            }
        });
    }
};
exports.default = controller;
