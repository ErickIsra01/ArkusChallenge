import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { useState, useEffect } from 'react'
import { getOneUser } from '../../services/users'
import { useNavigate } from 'react-router-dom'
import { verifyAuthorization } from '../../services/session'

function Home() {  
  const navigate = useNavigate();

  useEffect(() => {
    verifyAuthorization().catch((error) => {
      navigate('/');
      localStorage.clear();
      window.location.reload();
    });
  }, [])
  

  return (
      <div className="absolute flex h-[100%] w-[100%] flex-row">
        <aside className="flex flex-col w-[15%] h-screen px-5 py-8 overflow-y-auto bg-red-700 rtl:border-r-0 rtl:border-l">
          <Navbar />
        </aside>
        <main className="flex flex-col w-[85%] h-screen bg-white">
          <Outlet />
        </main>
      </div>
  )
}

export default Home