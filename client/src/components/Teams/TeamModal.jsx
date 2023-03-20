import React from 'react';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import Swal from 'sweetalert2';
import { createTeam } from '../../services/teams';

const validate = (values) => {
  const errors = {}
  const schema = Joi.object({
      teamName: Joi.string().required().error((errs) => {
        errs.forEach((error) => {
          switch (error.code) {
            case "string.empty": errors.teamName = "Requerido"; break;
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


function TeamModal() {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      teamName: ''
    },
    validate,
    onSubmit: values => {
      createTeam(values).then((response) => {
        Swal.fire(
          'Equipo creado de manera exitosa',
          'success'
        )
        navigate('/teams');
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
            <div className="px-3 mb-6 md:mb-0 w-full">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Nombre
              </label>
              <input id='teamName' onChange={formik.handleChange} value={formik.values.teamName} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" />
              { <p className='text-red-600'>{formik.errors.teamName}</p> }
            </div>
          </div>
          <div className="flex justify-center h-1/3">
              <NavLink className="m-auto" to={'/teams'}>
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

export default TeamModal