"use strict";
/// <reference path="./index.d.ts" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorhandler_1 = __importDefault(require("./middleware/errorhandler"));
const books_1 = __importDefault(require("./routes/books"));
const authentication_1 = require("./middleware/authentication");
const auth_1 = __importDefault(require("./routes/auth"));
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
const dbConn_1 = __importDefault(require("./config/dbConn"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = process.env.PORT || 3500;
app.disable("x-powered-by");
// Connect to DB
(0, dbConn_1.default)();
// Cross Origin Resource Sharing
const allowedOrigins = [
    "http://localhost:5173",
    "https://book-stpre.onrender.com",
    "https://book-store-qd6a.vercel.app",
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const errMsg = "The CORS policy for this site does not allow access from the specified Origin.";
            return callback(new Error(errMsg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(authentication_1.auth);
app.use("/api/auth", auth_1.default);
app.use("/api/books", books_1.default);
app.get("/", (_, res) => res.json(_.user));
app.use(errorhandler_1.default);
server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
