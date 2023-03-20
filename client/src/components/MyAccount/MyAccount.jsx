import React from 'react';
import ROLES from '../../constants';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { getOneUser } from '../../services/users';

function MyAccount({ id }) {
  const [editState, seteditState] = useState(false);
  const [UserData, setUserData] = useState({});

  useEffect(() => {
    getOneUser(localStorage.getItem('id')).then((response) => {
      setUserData(response.data)
    })
  }, [])


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      range: '',
      password: '',
      englishLevel: '',
      techKnowledge: '',
      CV: '',

    }
  });

  return (
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex w-[100%] h-[100%] flex-col my-2">
        <form action="">
          <div className="flex w-[100%] mb-6">
            <div className="px-3 mb-6 md:mb-0 w-1/2">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-second-name">
                Nombre
              </label>
              <input disabled={!editState} value={UserData.name ? UserData.name : ''}  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" />
            </div>
            <div className="md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
                Correo
              </label>
              <input disabled={localStorage.getItem('rol') === 'user' ? true : !editState} value={UserData.email ? UserData.email : ''} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"  type="text" placeholder="Doe" />
            </div>
          </div>
          <div className="flex w-[100%] mb-6 mt-8">
            <div className="px-3 mb-6 md:mb-0 w-1/2">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
                Nivel de inglés
              </label>
              <input disabled={!editState} value={UserData.englishLevel ? UserData.englishLevel : ''} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"  type="text" />
            </div>
            <div className="md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
                Link de CV
              </label>
              <input disabled={!editState} value={UserData.CV ? UserData.CV : ''} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"  type="text" />
            </div>
          </div>
          <div className="flex w-[100%] mb-6 mt-8">
            <div className="px-3 mb-6 md:mb-0 w-1/2">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-team-name">
                Equipo
              </label>
              <input disabled={!editState} value={UserData.englishLevel ? UserData.englishLevel : ''} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" />
            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">
                Conocimientos técnicos
              </label>
              <textarea disabled={!editState} value={UserData.techKnowledge ? UserData.techKnowledge : ''} rows={5} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type=""  />
            </div>
          </div>
          { localStorage.getItem('rol') === ROLES.user ? <></> : 
          <>
          <div className="-mx-3 md:flex mb-2">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-city">
                Contraseña
              </label>
              <input disabled={!editState} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-city" type="password" />
            </div>
            <div className="md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-zip">
                Rango
              </label>
              <input disabled={!editState} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-zip" type="text" />
            </div>
          </div>
          </>
          }
          <div className="flex justify-center">
            
              {editState === false ? 
              <a className="group rounded-2xl h-12 w-48 bg-white font-bold text-lg text-black outline relative overflow-hidden text-center" onClick={() => seteditState(true)}>
                Editar
                <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-slate-400/30 rounded-2xl">
                </div>
              </a>
              : 
              <>
                <button className="m-auto group rounded-2xl h-12 w-48 bg-white font-bold text-lg text-black outline relative overflow-hidden" onClick={() => seteditState(false)}>
                  Cancelar
                  <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-slate-400/30 rounded-2xl">
                  </div>
                </button>
                <button className="m-auto group rounded-2xl h-12 w-48 bg-red-600 font-bold text-lg text-white outline relative overflow-hidden" onClick={() => seteditState(false)}>
                  Guardar
                  <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-red-400/30 rounded-2xl">
                  </div>
                </button>
              </>
              }
          </div>       
        </form>
      </div>
  )
}

export default MyAccount