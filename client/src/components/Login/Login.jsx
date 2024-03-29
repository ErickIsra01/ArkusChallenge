import React, { useState } from "react";
import { useFormik } from 'formik';
import { login } from '../../services/session';
import { useNavigate } from 'react-router-dom';
import Joi from "joi";

const validate = (values) => {
    const errors = {};
    
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Correo invalido';
    }

    if (!values.email) {
      errors.email = 'Requerido';
    }

    if(!values.password) {
      errors.password = 'Requerido';
    }
    
    return errors 

}

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: async values => {
      const response = await login(values);
      if(response.isValid === true) {
        localStorage.setItem("rol", response.data.range);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.idUser);
        
        navigate('/myaccount');
      }
    }
  });

  return (
      <div className="h-screen flex">
        <div className="flex w-1/2 bg-red-600 i justify-around items-center" >
          <img src="/Arkus_logo.png" className="brightness-0 invert" alt="" />
        </div>
        <div className="flex w-1/2 justify-center items-center bg-white">
          <form className="bg-white" onSubmit={formik.handleSubmit}>
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Bienvenido!</h1>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <input className="pl-2 outline-none border-none" type="text" name="email" id="email" value={formik.values.email} placeholder="Email Address" onChange={formik.handleChange}/>
            </div>
              {formik.errors.email ? <div className="text-red-800 flex justify-center mb-4">{formik.errors.email}</div> : null}
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <input className="pl-2 outline-none border-none" type="text" name="" id="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange}/>
            </div>
            {formik.errors.password ? <div className="text-red-800 flex justify-center">{formik.errors.password}</div> : null}
            <button type="submit" className="block w-full bg-red-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
          </form>
          <div>
            
          </div>
        </div>
      </div>
  );
}

export default Login;
