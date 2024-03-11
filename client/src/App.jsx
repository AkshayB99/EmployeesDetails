import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./pages/header/header";
import Dashbord from "./pages/mainPage/dashbord";
import Login from "./pages/login/login";
import Employee from "./pages/mainPage/employee"
import UpdateEmp from './pages/mainPage/updateEmployee'
import CreateEmployee from "./pages/mainPage/createEmployee";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashbord />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/createEmployee" element={<CreateEmployee />} />
        <Route path="/updateEmployee/:id" element={<UpdateEmp />} />
      </Routes>
    </>
  );
}

export default App;
