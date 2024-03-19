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
const index_1 = require("../db/index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const authenticate_1 = require("../middleware/authenticate");
const inputParams = zod_1.z.object({ username: (0, zod_1.string)(), password: (0, zod_1.string)().min(5) });
const courseParams = zod_1.z.object({ title: (0, zod_1.string)(), description: (0, zod_1.string)(), price: (0, zod_1.number)(), imageLink: (0, zod_1.string)(), published: (0, zod_1.boolean)() });
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (inputParams.safeParse(req.body).success) {
        const { username, password } = req.body;
        const isuser = yield index_1.Admin.findOne({ username });
        if (isuser) {
            return res.status(403).json({ message: "user already Present Please login in" });
        }
        const user = new index_1.Admin({ username, password });
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ username, role: "admin" }, authenticate_1.secret, { expiresIn: "2h" });
        res.status(200).json({ message: "New user created successfully ", token });
    }
    else {
        return res.status(403).json({
            message: "Invalid inputs forbiden access"
        });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (inputParams.safeParse(req.body).success) {
        const { username, password } = req.body;
        const isuser = yield index_1.Admin.findOne({ username });
        if ((isuser === null || isuser === void 0 ? void 0 : isuser.password) === password) {
            const token = jsonwebtoken_1.default.sign({ username, role: "admin" }, authenticate_1.secret, { expiresIn: "2h" });
            res.status(200).json({ message: "Welcome Back Login Successfull ", token });
        }
        else {
            return res.status(403).json({ message: "Error while login" });
        }
    }
    else {
        return res.status(403).json({
            message: "Invalid inputs forbiden access"
        });
    }
}));
router.post("/course", authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if(!courseParams.safeParse(req.body).success)
    // {
    //     return res.status(403).json({message:"Forbiden inputs"})
    // }
    try {
        const { title, description, price, imageLink, published } = req.body;
        const obj = new index_1.Course({ title, description, price, imageLink, published });
        yield obj.save();
        return res.status(200).json({ obj, username: req.user });
    }
    catch (_a) {
        return res.status(403);
    }
}));
router.put('/courses', authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if(!courseParams.safeParse(req.body).success)
    // {
    //     return res.status(403).json({message:"Forbiden inputs"})
    // }
    const courseId = req.body.courseId;
    const course = yield index_1.Course.findByIdAndUpdate(courseId, req.body, { new: true });
    if (course) {
        res.json({ message: 'Course updated successfully' });
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
}));
router.get('/courses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield index_1.Course.find({});
    res.json({ courses });
}));
exports.default = router;
