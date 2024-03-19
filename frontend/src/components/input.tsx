import React from "react";
interface inputs{
    head:string,
    email:string,
    password:string,
    button:String,
    handle:Function
}
export  const Input:React.FC<inputs>=(props)=>
{

    return (
        <div className="flex justify-center items-center p-4 w-[100vw] h-[100vh]">
            <div className="flex flex-col gap-4 p-3 w-[50%] h-[50%] items-center bg-slate-100">
            <p className="text-3xl text-center ">Please {props.head}</p>
            <input className="text-xl w-[90%] h-[3rem] p-3 bg-slate-200" placeholder={props.email}
            onChange={(e)=>(e.target.value)}></input>
            <input className="text-xl w-[90%] h-[3rem] p-3 bg-slate-200"placeholder={props.password}></input>
            <button 
            onClick={()=>{props.handle()}}
            className="text-2xl w-[25%] h-[18%] mt-7  p-3 text-slate-700 rounded-md bg-blue-500 hover:bg-blue-600 
                                hover:text-white transiton-all duration-150 font-bold font-sans">{props.button}</button>
            </div>
        </div>
    )
}
