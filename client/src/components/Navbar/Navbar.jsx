import React from 'react'
import ROLES from '../../constants'
import { useNavigate, NavLink } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const role = localStorage.getItem("rol");

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
        window.location.reload(true);
    }
  
  return (
      <>
        <a href="#" className="flex justify-center">
            <img className="w-auto h-20 brightness-0 invert" src="Arkus_logo.png" alt=""/>
        </a>

        <div className="flex relative flex-col justify-items-center flex-1 mt-6">
            <nav className="-mx-3 space-y-6 h-[100%]">
                <div className="space-y-3 h-[100%]">
                    <NavLink to={'/myaccount'} className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 dark:hover:bg-red-300 dark:hover:text-black" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                        </svg>

                        <span className="mx-2 text-lg font-medium">Mi cuenta</span>
                    </NavLink>
                    {role === ROLES.user ? <></> : 
                    <>
                      <NavLink to={'/accounts'}  className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 dark:hover:bg-red-300 dark:hover:text-black" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>

                        <span className="mx-2 text-lg font-medium">Cuentas</span>
                      </NavLink>
                      
                      <NavLink to={'/teams'}  className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 dark:hover:bg-red-300 dark:hover:text-black" href="#">
                          <img src="https://www.svgrepo.com/show/33867/stick-man.svg" className="invert w-4" alt="" />

                          <span className="mx-2 text-lg font-medium">Equipos</span>
                      </NavLink>
                      
                      <NavLink to={'/users'}  className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 dark:hover:bg-red-300 dark:hover:text-black" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                          </svg>

                          <span className="mx-2 text-lg font-medium">Usuarios</span>
                      </NavLink>

                      <NavLink to={'/changes'}  className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 dark:hover:bg-red-300 dark:hover:text-black" href="#">
                          <img src="https://www.svgrepo.com/show/1327/transfer.svg" className="invert w-4" alt="" />

                          <span className="mx-2 text-lg font-medium">Cambios</span>
                      </NavLink>
                    </>
                    }
                        <a className="flex bottom-0 relative items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 dark:hover:bg-red-300 dark:hover:text-black" onClick={() => handleLogout()}>
                            <img src="https://www.svgrepo.com/show/132889/logout.svg" className="invert w-5" alt="" />
                            <span className="mx-2 text-lg font-medium">Salir</span>
                      </a>
                </div>
            </nav>
        </div>
      </>
  )
}

export default Navbar