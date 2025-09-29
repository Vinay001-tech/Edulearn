// import React from 'react'
// import Student from '../src/components/student'


// function App() {
//   return (
//     <div>
//   <Student/>
//     </div>
//   )
  
// }
// export default App



import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"; 
import Login from "./components/login";
import Signup from "./components/Signup";
import Guidelines from "./components/Guidlines";
import Courses from "./components/Courses";
import Contact from "./components/Contact";
import Mediator from "./components/mediator";
import Student from "./components/student";
import  Teacher from "./Teacher";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />  
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/Guidlines" element={<Guidelines/>}/>
        <Route path="/Courses" element={<Courses/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/Mediator" element={<Mediator/>}/>
        <Route path="/Student" element={<Student/>}/>
        <Route path="/Teacher" element={<Teacher/>}/>

      </Routes>
    </Router>
  );
}

export default App;







