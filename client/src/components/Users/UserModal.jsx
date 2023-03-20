import React from 'react';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { createUser } from '../../services/users';
import Swal from 'sweetalert2';

const validate = (values) => {
  const errors = {}
  const schema = Joi.object({
      name: Joi.string().required().error((errs) => {
        errs.forEach((error) => {
          switch (error.code) {
            case "string.empty": errors.name = "Requerido"; break;
          }
        })
        return errs
      }),
      email: Joi.string().email({ tlds: { allow: false } }).required().error((errs) => {
        errs.forEach((err) => {
          switch (err.code) {
            case "string.empty": errors.email = "Requerido"; break;
            case "string.email": errors.email = "Formato incorrecto"; break;
          }
        })
        return errs
      }),
      password: Joi.string().required().error((errs) => {
        errs.forEach((error) => {
          switch (error.code) {
            case "string.empty": errors.password = "Requerido"; break;
          }
        })
        return errs
      }),
      range: Joi.string().required().error((errs) => {
        errs.forEach((error) => {
          switch (error.code) {
            case "string.empty": errors.range = "Requerido"; break;
          }
        })
        return errs
      }),
      englishLevel: Joi.string().optional().allow(""),
      techKnowledge: Joi.string().optional().allow(""),
      CV:  Joi.string().uri().required().allow("").error((errs) => {
        errs.forEach((error) => {
          switch (error.code) {
            case "string.uri": errors.CV = "URI invalida"; break;
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


function UserModal() {
  const navigate = useNavigate()


  const [editState, seteditState] = useState(false);
  const [UserData, setUserData] = useState({})

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      range: '',
      password: '',
      englishLevel: '',
      techKnowledge: '',
      CV: '',
    },
    validate,
    onSubmit: values => {
      createUser(values).then((response) => {
        Swal.fire(
          'Usuario creado de manera exitosa',
          'success'
        )
        navigate('/users');
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
              <input id='name' onChange={formik.handleChange} value={formik.values.name} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" />
              { <p className='text-red-600'>{formik.errors.name}</p> }
            </div>
            <div className="md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Correo
              </label>
              <input id='email' onChange={formik.handleChange} value={formik.values.email} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"  type="text" />
              { <p className='text-red-600'>{formik.errors.email}</p> }
            </div>
          </div>
          <div className="-mx-3 md:flex mb-2">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Contraseña
              </label>
              <input id='password' onChange={formik.handleChange} value={formik.values.password} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" type="password" />
              { <p className='text-red-600'>{formik.errors.password}</p> }
            </div>
            <div className="md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-zip">
                Rango
              </label>
              <div className="relative inline-flex w-full">
                <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero"/></svg>
                <select id='range' onChange={formik.handleChange} value={formik.values.range} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4">
                  <option></option>
                  <option value={'user'}>user</option>
                  <option value={'admin'}>admin</option>
                </select>
              </div>
              { <p className='text-red-600'>{formik.errors.range}</p> }
            </div>
           </div>
          <div className="flex w-[100%] mb-6 mt-8">
            <div className="px-3 mb-6 md:mb-0 w-1/2">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Nivel de inglés
              </label>
              <input id='englishLevel' onChange={formik.handleChange} value={formik.values.englishLevel} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"  type="text" />
              { <p className='text-red-600'>{formik.errors.englishLevel}</p> }
            </div>
            <div className="md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Link de CV
              </label>
              <input id='CV' onChange={formik.handleChange} value={formik.values.CV} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"  type="text" />
              { <p className='text-red-600'>{formik.errors.CV}</p> }
            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">
                Conocimientos técnicos
              </label>
              <textarea id='techKnowledge' onChange={formik.handleChange} value={formik.values.techKnowledge} rows={5} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type=""  />
              { <p className='text-red-600'>{formik.errors.techKnowledge}</p> }
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

export default UserModal