"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.secret = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.secret = "varun";
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, exports.secret, (err, payload) => {
            if (err) {
                return res.status(403).json({ message: "Can not verify token" });
            }
            if (typeof payload === "object") {
                req.user = payload.username;
            }
            next();
        });
    }
    else {
        res.status(401).json({ message: "Unauthorized: Missing 'Authorization' header" });
    }
};
exports.authenticate = authenticate;
