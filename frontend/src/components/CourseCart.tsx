import React, { useEffect, useState } from "react";

export const CourseCart = () => {

  const [coursedata, setcoursedata] = useState([]);

  async function getcourse() {
    let url="http://localhost:3001/admin/courses"
    try{
    const response= await fetch(url,{method:"GET"});
    const data= await response.json();
    if(data.courses)
    {
      setcoursedata(data.courses);
    }
    }catch{

    }
  }


  

  useEffect(() => {
    getcourse();
  }, []);

  return (
   <div>
     <div className="border boder-slate-200 p-8 w-[90vw] rounded-lg mt-6 mx-auto bg-slate-100"
     > 
                <p className="text-4xl font-bold text-start  m-3">Expand your career opportunities</p>

                <p className="text-start m-3">
                Take one of Udemy’s range of Python courses and learn how to code using this incredibly useful language.
                Its simple syntax and readability makes Python perfect for Flask, Django, data science, and machine learning. 
                You’ll learn how to build everything from games to sites to apps. Choose from a range of courses that will appeal to
                </p>
                <p className="text-4xl font-bold text-slate-800 m-8 "> Our Courses  </p>
                <div className=" flex gap-3 justify-evenly mx-auto flex-wrap "
                style={
                  {backgroundImage:`url("https://sparebusiness.com/wp-content/uploads/2022/06/What-You-Need-to-Know-About-Course-Selling-Platforms.jpg")`, width:"",height:"",backgroundSize: 'cover' }
                  }>
                {
                      coursedata.length>0?
                            coursedata.map((e:any) => {
                              return (
                              <div className=" p-5" >
                                    <div className=" bg-slate-300 p-2">
                                          <div key={e._id} className="  max-w-[450px] max-h-[450px] min-h-[450px]  p-2  shadow-2xl hover:scale-110 transition-all  duration-300" 
                                                onClick={()=>{window.alert("touched the box ")}}>
                                              <img alt="course" 
                                              className="p-1 m-1 shadow-xl" src={`${e.imageLink}`}></img>
                                              <p className="text-3xl font-bold text-blue-800 underline text-start pl-4">{e.title}</p>
                                              <p className="text-slate-700  text-start pl-4">{e.description}</p>
                                              <div className="flex justify-between mt-3 p-2">
                                              <p className="text-2xl font-bold text-black text-start pl-4">Rs {e.price}</p>
                                              <p className=" text-yellow-600 text-start pl-4 font-semibold">{e.published ?`Available`:`Coming Soon`}</p>
                                              </div>
                                          </div>
                                    </div>
                              </div>
                              );
                          })
                          :
                          <div className="text-4xl text-center font-bold text-slate-500 text-white h-44 flex justify-center items-center">
                            Sorry No coursesss Available....
                          </div>                
                }
                </div>
     </div>
   </div>
  );
};
