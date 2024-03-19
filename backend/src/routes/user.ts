import express from "express";
import { authenticate , secret } from "../middleware/authenticate";
import { User,Admin,Course } from "../db";
const user_router = express.Router();
import jwt from "jsonwebtoken";
import {z} from "zod"
import { Response, Request,NextFunction } from "express";

interface userReq extends Request{
    user?:String;
}


user_router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const data =await user.populate("purchasedCourses")
      if(data)
        
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ username, role: 'user' }, secret, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });
  
user_router.post('/login', async (req:Request, res:Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, role: 'user' }, secret, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });
user_router.post('/courses/:courseId', authenticate, async (req:userReq, res) => {
    const course = await Course.findById(req.params.courseId);
      if (course ) {
      const user = await User.findOne({ username: req.user });
      const data = await user?.populate("purchasedCourses");
      const arr= data?.purchasedCourses;
      if (user) {
        user.purchasedCourses.push(course._id);
        await user.save();
        res.json({ message: 'Course purchased successfully' });
      } else {
        res.status(403).json({ message: 'User not found' });
      }
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });

user_router.get('/purchasedCourses', authenticate, async (req:userReq, res) => {
    const user = await User.findOne({ username: req.user }).populate('purchasedCourses');
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  });

export default user_router