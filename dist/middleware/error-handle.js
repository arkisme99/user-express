"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandle(err, _req, res, _next) {
    res.status(500).json({
        status: err.name,
        message: err.message,
    });
}
exports.default = errorHandle;
