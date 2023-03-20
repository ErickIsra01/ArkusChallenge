import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import MyAccount from "./components/MyAccount/MyAccount";
import Accounts from "./components/Accounts/Accounts";
import Users from "./components/Users/Users";
import Teams from "./components/Teams/Teams";
import Authorization from "./components/ProtectedRoute/Authorization";
import AdminRoutes from "./components/ProtectedRoute/AdminRoutes";
import UserModal from "./components/Users/UserModal";
import TeamModal from "./components/Teams/TeamModal";
import AccountModal from "./components/Accounts/AccountModal";


function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Home /> } >
        <Route path="myaccount" element={
          <Authorization>
            <MyAccount />
          </Authorization> 
        }/>
        
        <Route path="accounts" element={ 
          <Authorization>
            <AdminRoutes>
              <Accounts /> 
            </AdminRoutes>
          </Authorization>
        }/>

        <Route path="users" element={
          <Authorization>
            <AdminRoutes>
              <Users />
            </AdminRoutes>
          </Authorization>
        } />

        <Route path="teams" element={
          <Authorization>
            <AdminRoutes>
              <Teams /> 
            </AdminRoutes>
          </Authorization>
        } />

        <Route path="createUser" element={
          <Authorization>
            <AdminRoutes>
              <UserModal /> 
            </AdminRoutes>
          </Authorization>
        } /> 

        <Route path="editUser" element={
          <Authorization>
            <AdminRoutes>
              <MyAccount /> 
            </AdminRoutes>
          </Authorization>
        } /> 

        <Route path="createTeam" element={
          <Authorization>
            <AdminRoutes>
              <TeamModal /> 
            </AdminRoutes>
          </Authorization>
        } /> 

        <Route path="createAccount" element={
          <Authorization>
            <AdminRoutes>
              <AccountModal /> 
            </AdminRoutes>
          </Authorization>
        } /> 
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App