import { Navigate } from "react-router-dom";
import ROLES from "../../constants";
import React from "react";

function AdminRoutes({children}) {

  const rol = localStorage.getItem('rol');
  const token = localStorage.getItem('token');
  if(rol !== ROLES.superuser && rol !== ROLES.admin) return <Navigate replace to={"/myaccount"}/>;
  
  return children
}

export default AdminRoutes