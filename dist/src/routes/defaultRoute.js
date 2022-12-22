"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRoute = void 0;
const express_1 = require("express");
exports.defaultRoute = (0, express_1.Router)();
exports.defaultRoute.get('/asd', (req, res) => {
    res.send('health check is good asldk;asd');
});
exports.default = exports.defaultRoute;
