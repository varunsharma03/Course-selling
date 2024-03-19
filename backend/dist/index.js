"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const admin_1 = __importDefault(require("./routes/admin"));
const user_1 = __importDefault(require("./routes/user"));
const port = 3001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/admin', admin_1.default);
app.use('/user', user_1.default);
app.listen(port, () => console.log(`app is running on ${port}`));
mongoose_1.default.connect("mongodb+srv://nagato3:abcd1234@cluster0.5uwzgpa.mongodb.net", { dbName: "course-backend" })
    .then(() => { console.log("Database connection successful"); })
    .catch(() => { console.log("Error in connecting "); });
