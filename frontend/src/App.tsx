import React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import{LoginAdmin} from "./pages/LoginAdmin"
import {SignupAdmin} from "./pages/SignupAdmin"
import{ SignupUser} from "./pages/SignupUser";
import {LoginUser} from "./pages/LoginUser"
import { Test } from './components/Test';
import { AdminPage } from './pages/AdminPage';
import { CourseCart } from './components/CourseCart';
import { UpdateCourse } from './components/UpdateCourse';
import { Addcourse } from './components/Addcourse';

function App() {
 

  return (
    <div className="App">
   
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='Admin/Login' element={<LoginAdmin/>} />
          <Route path='Admin/Signup' element={<SignupAdmin/>} />
          <Route path='User/Login' element={<LoginUser/>} />
          <Route path='User/Signup' element={<SignupUser/>} />
          <Route path='User/Signup' element={<SignupUser/>} />
          <Route path='/Admin/DashBoard' element={<AdminPage/>} />
          <Route path='/editCourse' element={<UpdateCourse/>} />
          <Route path='/Addcourse' element={<Addcourse/>} />
          {/* <Route path='/Signup' element={} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
