import { useContext, useEffect } from "react";
import { AppContext } from '../context/AppContext';
import AppTopBar from "../components/AppBar";
import { Container } from "@mui/material";
import Login from "../Auth/Login";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from "../Auth/Register";
import Calculator from "../Calculator/Calculator";
import RequireAuth from "../Auth/RequireAuth";

const Home = () => {
  const { user } = useContext(AppContext);
  
  return (
    <Router>      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={user.email ? <Calculator/> : <Navigate to="/login" />}
        />        
      </Routes>
    </Router>    
  );
};

export default Home;