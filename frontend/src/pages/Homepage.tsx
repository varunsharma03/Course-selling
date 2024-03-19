import React from "react";
import Typewriter from "typewriter-effect";
import { CourseCart } from "../components/CourseCart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Homepage=()=>{
    const navigate=useNavigate();

    const [isHoveredLogin, setIsHoveredLogin] = useState(false);
    const [isHoveredSignup, setIsHoveredSignup] = useState(false);
    return (
        <div className="p-4 m-4 mt-0 pt-0">
                <div className="flex justify-between p-4 shadow-lg">
                    <p className="text-3xl font-bold ml-14 mt-4">Welcome to Course-APP</p>
                    <div className="flex gap-4 p-2 ">
                        <button
                        className="border btn-up hover:bg-slate-200 relative transition-all duration-150 border-slate-900 text-center p-3 rounded-lg text-lg font-bold text-black w-[7rem] h-[3rem]"
                        onMouseEnter={() => setIsHoveredLogin(true)}
                        onMouseLeave={() => setIsHoveredLogin(false)}
                        >
                        Login
                        <div className={`border-2 border-slate-400 btn-down mt-3 bg-slate-900 text-white
                        font-bold ${isHoveredLogin ? 'visible' : 'hidden'} p-2` }>
                            <button className="text-lg font-mullish m-1 "
                            onClick={()=>navigate("/admin/login")}>Admin</button>
                            <button onClick={()=>navigate("/user/login")}>User</button>
                        </div>
                        </button>

                    <button
                        className="border bg-slate-800 btn-up text-white  hover:bg-slate-200 hover:text-slate-800 relative transition-all duration-150 border-slate-900 text-center p-3 rounded-lg text-lg font-bold  w-[7rem] h-[3rem]"
                        onMouseEnter={() => setIsHoveredSignup(true)}
                        onMouseLeave={() => setIsHoveredSignup(false)}
                        >
                        Signup
                        <div className={`border-2 border-slate-400 btn-down mt-3 bg-slate-900 text-white
                        font-bold ${isHoveredSignup ? 'visible' : 'hidden'} p-2` }>
                            <button className="text-lg font-mullish m-1 "
                            onClick={()=>navigate("/admin/signup")}>Admin</button>
                            <button
                            onClick={()=>navigate("/user/signup")}>User</button>
                        </div>
                        </button>
                    </div>
                </div>

                <div className="p-4 m-3">
                    <p className="text-center text-4xl font-bold text-slate-600 mt-6">Explore out variety of courses </p>
                    <div className="w-[90vw] mx-auto h-[50vh] flex gap-3 m-4 p-4 justify-evenly bg-slate-400 
                    bg-[url('https://img-b.udemycdn.com/notices/web_carousel_slide/image/4f9d4123-43ee-4f2a-b5ef-1f2ac22962f3.jpg')]">
                            <div className="mt-8 p-4 pt-0 bg-white w-[50%] h-[70%] shadow-xl flex flex-col items-center">
                                <p className="text-3xl font-bold font-sans text-slate-900 mt-12 ">NEW TO APP ? </p>
                                <p className="text-2xl text-slate-600 font-bold font-mullish tracking-wide"> Start</p>
                                    <p className="text-2xl text-blue-600 font-bold block tracking-widest">
                                    <Typewriter 
                                        options={{
                                            strings: ['Learning REACTJS...','Learning JAVASCRIPT...',' Learning NODEJS...','Learning EXPRESSJS...','Learning MONGODB...','Learning TYPESCRIPT...'],
                                            autoStart: true,
                                            loop: true,
                                        }}/>
                                    </p>
                                </div>

                                <div className="w-[40%]">

                                </div>
                    </div>
                        
                </div>

                <CourseCart/>
        </div>
    )
}