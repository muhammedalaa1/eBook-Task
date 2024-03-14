"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const UserSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        min: 2,
        max: 15,
        required: true,
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return validator_1.default.isEmail(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
        required: [true, "User email required"],
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return validator_1.default.isMobilePhone(v, "ar-EG");
            },
            message: (props) => `${props.value} is not a valid phone!`,
        },
        required: [true, "User phone required"],
    },
    password: {
        type: String,
        required: [true, "User password required"],
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
