import { useContext, useEffect } from "react";
import { AppContext } from '../context/AppContext';
import AppTopBar from "../components/AppTopBar";
import { Container } from "@mui/material";
import Login from "../Auth/Login";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from "../Auth/Register";
import Calculator from "../Calculator/Calculator";
import RequireAuth from "../Auth/RequireAuth";
import Records from "../Records/Records";
import Skeleton from "../components/Skeleton";

const Home = () => {
  const { user } = useContext(AppContext);
  console.log(user);
  return (
    <Router>      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={user.email ? <Skeleton><Calculator/></Skeleton> : <Navigate to="/login" />}
        />        
        <Route
          path="/records"
          element={user.email ? <Skeleton><Records/></Skeleton> : <Navigate to="/login" />}
        /> 
      </Routes>
    </Router>    
  );
};

export default Home;