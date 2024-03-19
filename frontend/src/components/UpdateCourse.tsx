import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
interface Course {
    _id?: string;
    title?: string;
    description?: string;
    price?: number;
    published?: boolean;
  }
  export const UpdateCourse = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [Falg,setFlag]= useState(true)
    const [title, settitle] = useState(location.state?.title || "");
    const [price, setprice] = useState(location.state?.price || "");
    const [description, setdescription] = useState(location.state?.description || "");
    const [published, setpublished] = useState(location.state?.published || false);
    const [imageLink,setimagelink]= useState(location.state?.imageLink|| "");
  
    async function handleUpdate() {
      let url = "http://localhost:3001/admin/courses";
      let token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          courseId: location.state.id,
          title,
          description,
          price,
          published,
        }),
        headers: {
        "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        },
      });
      const data = await response.json();
      if(data)
      {
        console.log(data.message);
        setFlag(false);
        setTimeout(()=>{
            navigate("/Admin/DashBoard");
        },2000);
      }
    }
  

    return (
       <div>
            {
                Falg?
                <div>
                            <div className="flex flex-col gap-2 mx-auto my-auto p-4 bg-slate-200 w-[100vw] justify-center items-center h-[100vh]">
                                
                                <div className="w-[70%] flex justify-between p-2 mx-auto  ">
                                <p  className="w-[60%] h-[5%] p-2 font-bold text-gray-800 rounded-lg text-2xl mb-4">Course Id : {location.state.id}</p>
                                <button className=" bg-blue-400 hover:bg-blue-500 transition-all duration-300 w-[12rem] rounded-xl font-bold text-white text-xl "
                                onClick={()=>{navigate(-1)}}>Back</button>
                                </div>
                                <input type="text" 
                                className="w-[60%] 0-[5%] p-2 font-bold text-gray-500 rounded-lg shadow-lg"
                                value={title} onChange={(e)=>{settitle(e.target.value)}}></input>
                                <input type="text" value={description}
                                className="w-[60%] h-[5%] p-2 font-bold text-gray-500 rounded-lg shadow-lg" onChange={(e)=>{setdescription(e.target.value)}}></input>
                                <input type="text" value={price} 
                                className="w-[60%] h-[5%] p-2 font-bold text-gray-500 rounded-lg shadow-lg" onChange={(e)=>{setprice(e.target.value)}}></input>
                                <input placeholder="imageLink.." value={imageLink} 
                                className="w-[60%] h-[5%] p-2 font-bold text-gray-500 rounded-lg shadow-lg"
                                onChange={(e)=>{setimagelink(e.target.value)}}></input>
                                <button className="w-[20%] h-[9%] rounded-lg p-2 font-bold transition-all duration-300 text-white text-xl "
                                onClick={()=>setpublished(!published)}>{published? <p  className="w-[100%] 
                                h-[100%] rounded-lg p-2 font-bold bg-blue-400 flex flex-col justify-between">Published </p>:
                                <p className="w-[100%] h-[100%] rounded-lg p-2 font-bold bg-slate-500">Not Published</p>}
                                </button>
                                <button  
                                onClick={()=>{handleUpdate()}}
                                className="w-[19%] h-[7%] bg-blue-400 hover:bg-blue-500 text-white text-xl rounded-lg p-2 font-bold transition-all duration-300 ">
                                    Update
                                </button>
                            </div>
                </div>
                :
                <div className="flex flex-col gap-4 justify-center items-center p-3 w-[100vw] h-[80vh]">

                    <p className="text-center text-4xl font-bold text-slate-500">
                    Course Updating...
                    </p> 
                    <p className="text-2xl font-bold text-red-400 mt-6 ">
                        Redirecting
                        <br></br>
                        <div className=" mt-8  loader ">
                          
                        </div>
                    </p>
                
                </div>

            }

       </div>
    )
}
