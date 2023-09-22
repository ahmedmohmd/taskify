"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = exports.errorResponse = void 0;
const successResponse = (res, statusCode = 200, data = null) => {
    if (statusCode === 200 && data) {
        return res.status(statusCode).json({ success: true, data });
    }
    res.status(statusCode).send();
};
exports.successResponse = successResponse;
const errorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ success: false, message });
};
exports.errorResponse = errorResponse;
