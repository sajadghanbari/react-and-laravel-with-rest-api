import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
  const {token} = useStateContext()
  // debugger;
    if (token){
      return <Navigate to="/" />
    }
  return (
    <div>
      <Outlet />
    </div>
  )
}