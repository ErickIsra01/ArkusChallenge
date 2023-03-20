import React from 'react';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { createUser } from '../../services/users';
import Swal from 'sweetalert2';
import { createAccount } from '../../services/accounts';

const validate = (values) => {
  const errors = {}
  const schema = Joi.object({
      accountName: Joi.string().required().error((errs) => {
        errs.forEach((error) => {
          switch (error.code) {
            case "string.empty": errors.name = "Requerido"; break;
          }
        })
        return errs
      }),
      clientName: Joi.string().required().error((errs) => {
        errs.forEach((err) => {
          switch (err.code) {
            case "string.empty": errors.email = "Requerido"; break;
            case "string.email": errors.email = "Formato incorrecto"; break;
          }
        })
        return errs
      }),
      responsableName: Joi.string().required().error((errs) => {
        errs.forEach((error) => {
          switch (error.code) {
            case "string.empty": errors.password = "Requerido"; break;
          }
        })
        return errs
      })
  }).options({abortEarly: false})
  const validatedData = schema.validate(values);
  if(validatedData.error) {
      return errors;
  }

}


function AccountModal() {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      accountName: '',
      clientName: '',
      responsableName: ''
    },
    validate,
    onSubmit: values => {
      createAccount(values).then((response) => {
        Swal.fire(
          'Cuenta creada de manera exitosa',
          'success'
        )
        navigate('/accounts');
      }).catch((error) => {
        Swal.fire({
          icon: 'error',
          text: error.error.response.data,
          footer: '<a href="">Try reloading the page</a>'
        })
      });
    }

  });

  return (
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex w-[100%] h-[100%] flex-col my-2">
        <form action="">
          <div className="flex w-[100%] mb-6">
            <div className="px-3 mb-6 md:mb-0 w-1/2">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Nombre
              </label>
              <input id='accountName' onChange={formik.handleChange} value={formik.values.accountName} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" />
              { <p className='text-red-600'>{formik.errors.accountName}</p> }
            </div>
            <div className="md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Cliente
              </label>
              <input id='clientName' onChange={formik.handleChange} value={formik.values.clientName} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"  type="text" />
              { <p className='text-red-600'>{formik.errors.clientName}</p> }
            </div>
          </div>
          <div className="-mx-3 md:flex mb-2">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Responsable
              </label>
              <input id='responsableName' onChange={formik.handleChange} value={formik.values.responsableName} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" type="text" />
              { <p className='text-red-600'>{formik.errors.responsableName}</p> }
            </div>
           </div>
          <div className="flex justify-center h-1/3">
              <NavLink className="m-auto" to={'/users'}>
                <button type="button" className="group rounded-2xl h-12 w-48 bg-white font-bold text-lg text-black outline relative overflow-hidden">
                  Cancelar
                  <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-slate-400/30 rounded-2xl">
                  </div>
                </button>
              </NavLink>
              <button onClick={formik.handleSubmit} type="submit" className="m-auto group rounded-2xl h-12 w-48 bg-red-600 font-bold text-lg text-white outline relative overflow-hidden">
                Guardar
                <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-red-400/30 rounded-2xl">
                </div>
              </button>
          </div>       
        </form>
      </div>
  )
}

export default AccountModal