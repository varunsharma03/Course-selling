import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateCourse } from "../components/UpdateCourse";
import { url } from "inspector";


interface Course {
  _id?: string;
  title?: string;
  description?: string;
  price?: number;
  published?: boolean;
  imageLink?:String
}

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Course[]>([]);

  useEffect(() => {
    courseLoad();
  }, []);

  async function courseLoad() {
    const url = "http://localhost:3001/admin/courses";
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (response.ok) {
      const courses = await response.json();
      setData(courses.courses);
      console.log(courses);
    } else {
      console.error("Failed to fetch courses");
    }
    
  }

  return (
    <div >
      <div className="flex justify-between bg-slate-100">
        <h1 className="text-5xl text-start font-bold text-blue-500 p-4">Welcome!!!</h1>
        {/* log out and Add course  */}
        <div className="flex gap-2">
                    <p
                    onClick={()=>{navigate("/Addcourse")}}
                    className="font-bold cursor-pointer text-2xl text-blue-500 p-4 text-center  rounded-lg bg-blue-100 ">
                        Add Course
                    </p>
                    <p
                    className="font-bold cursor-pointer text-2xl text-center bg-slate-200 rounded-lg text-slate-500 p-4 mr-5"
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/");
                    }}
                    >
                    Log Out
                    </p>
        </div>
      </div>
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-5 p-5 mx-auto bg-slate-300 pt-3 mt-3 justify-center items-center w-full"
        style={
          {
            
            // backgroundImage:`url("https://sparebusiness.com/wp-content/uploads/2022/06/What-You-Need-to-Know-About-Course-Selling-Platforms.jpg")`, width:"100vw",height:"100vh",backgroundSize: 'cover'
           }
          }
          >
          {data.map((course) => (
            <div key={course._id}
                className={`flex flex-col p-3 m-2 gap-4 bg-slate-200 rounded-lg min-w-[450px] max-w-[450px] max-h-[500px] min-h-[500px] 
               `}
            >
               
                  <p className="text-3xl font-bold underline  text-slate-700">{course.title}</p>
                  <img src={`${course.imageLink}`} alt="course" 
                  className="mx-auto p-1 rounded-lg shadow-xl opacity-90 hover:opacity-100 transition-all duration-300 max-w-96"
                  ></img>
                  <div className="flex justify-between">
                    <p className="text-xl font-bold text-blue-400">{course.price}</p>
                    <p>
                      {course.published ? (
                        <p className="text-md text-blue-600">Published</p>
                      ) : (
                        <p className="text-md text-slate-700">Not Published</p>
                      )}
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-start mx-0 text-slate-600 px-1">{course.description}</p>
                  <p
                          className="text-xl text-end font-bold cursor-pointer text-end"
                          onClick={() => {
                            navigate("/editCourse", {
                              state: {
                                id: course._id,
                                title:course.title,
                                description:course.description,
                                published:course.published,
                                price:course.price,
                                imagelink:course.imageLink
                              },
                            });
                          }}
                  >
                    Edit Course
                  </p>
            </div> 
          ))}
        </div>
      ) : (
        <div className="flex justify-center flex-col w-[100vw] h-[70vh] items-center text-4xl font-bold text-blue-500"> In Queue......
        
          <div className="loader mt-12  ">

          </div>
        </div>
      )}
    </div>
  );
};
