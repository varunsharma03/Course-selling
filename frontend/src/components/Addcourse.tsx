import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Addcourse=()=>{

    const [title, settitle] = useState("");
    const [price, setprice] = useState("");
    const [description, setdescription] = useState("");
    const [published, setpublished] = useState(true);
    const[imageLink,setimagelink]=useState("");
    const [flag,setflag]=useState(true);
    const navigate= useNavigate();
    async function handleSumbit() {

            if((title && price && description )=== "")
            {
                window.alert("Please Fill all the details")
            }
            const url= "http://localhost:3001/admin/course";
            const token= localStorage.getItem("token");
            try {
                const response = await fetch(url, {
                  method: "POST",
                  body: JSON.stringify({
                    title,
                    description,
                    price,
                    published,
                    imageLink
                  }),
                  headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${token}`,
                  },
                });
              
                if (response) {
                  const data = await response.json();
                  setflag(false);
                  setTimeout(()=>{
                    navigate("/Admin/DashBoard");
                    setflag(true);
                  },2000)
                } else {
                  console.error("Failed to add the course");
                }
              } catch (error) {
                console.error("An error occurred:", error);
              }
              
    }

    return (

        <div>
        {
          flag?
          // update ui
          <div className="flex flex-col gap-2 mx-auto my-auto p-4 bg-slate-200 w-[100vw] justify-center items-center h-[100vh]">
                                
          <div className="w-[70%] flex justify-between p-2 mx-auto  ">
          <p  className="w-[60%] h-[5%] p-2 underline  font-bold text-slate-600 rounded-lg text-3xl mb-4">Add New Course </p>
          <button className=" bg-blue-500 w-[12rem] rounded-xl font-bold text-white text-xl hover:bg-blue-700 transition-all duration-300 ease "
          onClick={()=>{navigate(-1)}}>Back</button>
          </div>
          <input type="text" 
          placeholder="Title..."
          className="w-[60%] 0-[5%] p-2 font-bold text-gray-500 rounded-lg shadow-lg"
           onChange={(e)=>{settitle(e.target.value)}}></input>
          <input type="text" 
          placeholder="Description..."
          className="w-[60%] h-[5%] p-2 font-bold text-gray-500 rounded-lg shadow-lg" onChange={(e)=>{setdescription(e.target.value)}}></input>
          <input type="text" 
          placeholder="Price..."
          className="w-[60%] h-[5%] p-2 font-bold text-gray-500 rounded-lg shadow-lg" onChange={(e)=>{setprice(e.target.value)}}></input>
          <input type="text" 
          placeholder="ImageLink..."
          className="w-[60%] h-[5%] p-2 font-bold text-gray-500 rounded-lg shadow-lg" onChange={(e)=>{setimagelink(e.target.value)}}></input>
          <div className="text-start text-xl font-bold flex gap-2 justify-center items-center justify-between  w-[60%] p-2 rounded-md shadow-lg" >
                      {published?
                      <button 
                      className="w-[30%] h-[70%] bg-blue-500 hover:bg-blue-700 transition-all duration-300 ease rounded-lg p-2 text-white mt-5 font-2xl font-bold "
                      onClick={()=>{setpublished(false)}}>
                          Published 
                      </button>
                      :
                      <button 
                      className="w-[30%] h-[70%] bg-slate-400 hover:bg-slate-500 transition-all duration-300 ease rounded-lg p-2 text-gray-700 mt-5 font-2xl font-bold "
                      onClick={()=>{setpublished(true)}}>
                          Not Published
                      </button>
                      }
                      <button  
                      onClick={()=>{handleSumbit()}}
                      className="w-[30%] h-[70%] bg-blue-500 hover:bg-blue-700 transition-all duration-300 ease rounded-lg p-2 text-white mt-5 font-2xl font-bold ">
                          Add
                      </button>
          </div>
          
         
        </div>
        :
        // loading ui
        <div className="flex justify-center items-center w-[100vw] h-[60vh]">
             <p className="text-center text-4xl font-bold text-slate-500">
                    Course Submitting...
                    </p> 
                    <p className="text-2xl font-bold text-red-400 mt-8 ">
                       
                        <br></br>
                        <div className=" mt-8  loader ">

                        </div>
                    </p>
        </div>
        }

           

        </div>
    )
}