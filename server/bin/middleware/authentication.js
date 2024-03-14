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
exports.isLogged = exports.auth = void 0;
const jwtToken_1 = require("../utils/jwtToken");
const cookie_1 = __importDefault(require("cookie"));
const auth = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!req.headers.cookie)
            return next();
        const cookies = cookie_1.default.parse((_a = req.headers.cookie) !== null && _a !== void 0 ? _a : "");
        const token = cookies[process.env.AUTH_COOKIE];
        if (!token)
            return next();
        req.user = yield (0, jwtToken_1.findUserByToken)(token);
        next();
    });
};
exports.auth = auth;
const isLogged = function (LoggedIn, path = "/") {
    return (req, res, next) => {
        if (!!req.user === LoggedIn)
            return next();
        if (typeof path === "string")
            res.redirect(path);
        else
            throw path;
    };
};
exports.isLogged = isLogged;
