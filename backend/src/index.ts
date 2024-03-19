import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/admin";
import user_router from "./routes/user"
const port = 3001;
const app= express();
app.use(express.json());
app.use(cors());

app.use('/admin',router);
app.use('/user',user_router);

app.listen(port,()=>console.log(`app is running on ${port}`));

mongoose.connect("mongodb+srv://nagato3:abcd1234@cluster0.5uwzgpa.mongodb.net",{dbName:"course-backend"})
.then(()=>{console.log("Database connection successful")})
.catch(()=>{console.log("Error in connecting ")})