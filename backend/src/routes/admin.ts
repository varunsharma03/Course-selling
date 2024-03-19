import express from "express";
import { User,Admin,Course } from "../db/index";
import Jwt  from "jsonwebtoken";
import { boolean, number, string, z } from "zod";
import { Request,Response,NextFunction } from "express";
import { authenticate, secret } from "../middleware/authenticate";

const inputParams= z.object({username:string(),password:string().min(5)})
const courseParams=z.object({title:string(),description:string(),price:number(),imageLink:string(),published:boolean()})

const router = express.Router();
interface userpara extends Request{
    user?: string;
}
router.post("/signup",async (req,res)=>{
            if(inputParams.safeParse(req.body).success){
                    const {username,password}=req.body;
                    const isuser=await Admin.findOne({username});
                    if(isuser){
                        return res.status(403).json({message:"user already Present Please login in"})
                    }
                    const user= new Admin({username,password});
                    await user.save();
                    const token= Jwt.sign({username,role:"admin"},secret,{expiresIn:"2h"});
                    res.status(200).json({message:"New user created successfully ",token})
            }else{
                    return res.status(403).json({
                        message:"Invalid inputs forbiden access"
                    })
            }
})


router.post("/login",async(req,res)=>{
    if(inputParams.safeParse(req.body).success){
        const {username,password}=req.body;
        const isuser=await Admin.findOne({username});
        if(isuser?.password===password){
            const token= Jwt.sign({username,role:"admin"},secret,{expiresIn:"2h"});
            res.status(200).json({message:"Welcome Back Login Successfull ",token})
        }else{
            return res.status(403).json({message:"Error while login"})
        }
    }else{
        return res.status(403).json({
            message:"Invalid inputs forbiden access"
        })
}
})


router.post("/course",authenticate,async (req:userpara,res:Response)=>{
    // if(!courseParams.safeParse(req.body).success)
    // {
    //     return res.status(403).json({message:"Forbiden inputs"})
    // }
    try{
    const {title,description,price,imageLink,published}=req.body;
    const obj = new Course({title,description,price,imageLink,published});
    await obj.save();
    return res.status(200).json({obj,username:req.user})
    }
    catch{
        return res.status(403);
    }
})

router.put('/courses', authenticate, async (req:Request, res:Response) => {
    // if(!courseParams.safeParse(req.body).success)
    // {
    //     return res.status(403).json({message:"Forbiden inputs"})
    // }
    const courseId=req.body.courseId;
    const course = await Course.findByIdAndUpdate(courseId, req.body, { new: true });
    if (course) {
      res.json({ message: 'Course updated successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });

router.get('/courses',  async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
  });

  

export default router;