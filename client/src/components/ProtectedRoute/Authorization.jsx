import { Navigate } from "react-router-dom";
import ROLES from "../../constants";
import React from "react";

function Authorization({children}) {
  const rol = localStorage.getItem('rol');
  const token = localStorage.getItem('token');
  if(!token  && !rol) return <Navigate replace to={"/"}/>;
  
  return children
}

export default Authorization