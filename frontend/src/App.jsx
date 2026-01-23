import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";

function App() {

  return (
    <>
       <BrowserRouter>
           <Routes>
               <Route path="/register" element={<Register />} />
               <Route path="/login" element={<Login />} />
               <Route path="/" element={<Register />} />

           </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
