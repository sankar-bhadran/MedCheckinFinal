import React from 'react'
import {  Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
const AuthComponent = () => {
    const isLoggedIn=localStorage.getItem("existinguser")
  return (
    <div>
        {isLoggedIn?<Outlet/>:<Navigate to="/" />}
    </div>
  )
}

export default AuthComponent