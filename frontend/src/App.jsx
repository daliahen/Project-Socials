import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import {AuthProvider, ProtectedRoute} from "./Contexts/AuthContext.jsx";

function App() {

  return (
    <>
       <BrowserRouter>
           <AuthProvider>
               <Routes>
                   <Route path="/register" element={<Register />} />
                   <Route path="/login" element={<Login />} />
                   <Route path="/" element={<Register />} />
                   <Route path="/dashboard" element={
                       <ProtectedRoute>
                           <Dashboard />
                       </ProtectedRoute>
                   } />
               </Routes>
           </AuthProvider>
       </BrowserRouter>
    </>
  )
}

export default App
