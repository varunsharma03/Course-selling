import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export const LoginAdmin=()=>{
    const navigate =useNavigate();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const  handleSubmit= async ()=>
        {
            if(!username || !password){
                window.alert("Please fill arguments")
                navigate(0);
                return ;
            }
            const url = "http://localhost:3001/admin/login";
            const response= await fetch(url,{
                method:"POSt",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    username,password
                })
            });
            const data= await response.json();
            if(!data)
            {
                window.alert("Error while logging In")
                return ;
            }else{
                localStorage.setItem("token",data.token);
                navigate("/Admin/DashBoard")          
            }
                  
        }
    return(
        <div className="w-full h-full">

                <div>
                <p className="text-center font-bold text-4xl text-blue-700 mt-6">Login for Amdin </p>
                </div>
                <div className="flex flex-col gap-2 w-[80%] h-[25rem] justify-around  mx-auto items-center mt-10 p-3 bg-slate-100 rounded-xl">
                    <input placeholder="Username..." 
                    className="text-2xl border-2 shadow-lg w-[80%] text-slate-800 p-2"
                    onChange={(e)=>setUsername(e.target.value)}></input>
                    <input placeholder="Password..." type="password"
                    className="text-2xl border-2 shadow-lg w-[80%] text-slate-800 p-2"
                    onChange={(e)=>setPassword(e.target.value)}></input>
                    <button className="text-2xl font-bold w-[15%] rounded-lg 
                    hover:bg-blue-400 mx-auto p-2 h-[4rem] bg-blue-500"
                    onClick={()=>{handleSubmit()}}>
                        LogIn...</button>
                </div>
        </div>
    )
}
