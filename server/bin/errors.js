"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchError = exports.validationError = exports.APIError = void 0;
class APIError extends Error {
    /**
     * @param {string} message
     * @param {number} statusCode
     */
    constructor(message, statusCode) {
        super(message);
        super.name = "APIError";
        this.statusCode = statusCode;
    }
}
exports.APIError = APIError;
const validationError = () => new APIError("Validation failed.", 400);
exports.validationError = validationError;
const searchError = () => new APIError("Name is required", 400);
exports.searchError = searchError;
