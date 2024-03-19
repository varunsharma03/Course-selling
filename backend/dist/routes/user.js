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
const express_1 = __importDefault(require("express"));
const authenticate_1 = require("../middleware/authenticate");
const db_1 = require("../db");
const user_router = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
user_router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.User.findOne({ username });
    if (user) {
        const data = yield user.populate("purchasedCourses");
        if (data)
            res.status(403).json({ message: 'User already exists' });
    }
    else {
        const newUser = new db_1.User({ username, password });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ username, role: 'user' }, authenticate_1.secret, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token });
    }
}));
user_router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.User.findOne({ username, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ username, role: 'user' }, authenticate_1.secret, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
}));
user_router.post('/courses/:courseId', authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield db_1.Course.findById(req.params.courseId);
    if (course) {
        const user = yield db_1.User.findOne({ username: req.user });
        const data = yield (user === null || user === void 0 ? void 0 : user.populate("purchasedCourses"));
        const arr = data === null || data === void 0 ? void 0 : data.purchasedCourses;
        if (user) {
            user.purchasedCourses.push(course._id);
            yield user.save();
            res.json({ message: 'Course purchased successfully' });
        }
        else {
            res.status(403).json({ message: 'User not found' });
        }
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
}));
user_router.get('/purchasedCourses', authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.User.findOne({ username: req.user }).populate('purchasedCourses');
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    }
    else {
        res.status(403).json({ message: 'User not found' });
    }
}));
exports.default = user_router;
