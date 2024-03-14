"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const errorhandler = (err, req, res, next) => {
    if (err instanceof errors_1.APIError) {
        return res.status(err.statusCode).json({
            message: err.message,
            stackTrace: err.stack,
        });
    }
    console.log(err);
    return res.status(500).json({
        message: "UnExpected Error, try more.",
    });
};
exports.default = errorhandler;
