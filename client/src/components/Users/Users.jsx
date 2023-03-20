import React from 'react'
import { useEffect, useState } from 'react'
import { deleteUser, getUsers } from '../../services/users';
import UserListRow from './UserListRow';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Clients() {
  const [Users, setUsers] = useState([]);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [User, setUser] = useState('');
  const [Render, setRender] = useState(false)


  useEffect(() => {
    getUsers().then((response) => {
      setUsers(response.data);
    })
  }, [DeleteModal])

  function handleDelete(id){

    Swal.fire({
      title: '¿Quieres eliminar este usuario?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Borrar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isDenied) {
        deleteUser(id).then((response) => {
          Swal.fire('Eliminado', '', 'success')
          setDeleteModal(false);
          setRender(!Render)
        }).catch((error) => {
          Swal.fire({
            icon: 'error',
            text: error.error.response.data,
            footer: '<a href="">Try reloading the page</a>'
          })
        })
      }
    })
  }


  return (
      <div className="w-[100%] mx-auto">
          <div className="w-[100%] inline-block min-w-full py-2 align-middle">
              <div className="w-[100%] overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="w-[100%] divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                          <tr>
                              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">#</th>
                              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Nombre</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Correo</th>
                              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Opciones</th>
                              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                                <NavLink to={'/createUser'}>
                                  <img src="/add-square-svgrepo-com (1).png" className="w-7 pt-1 stroke-white" />
                                </NavLink>
                              </th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {Users.map((element, id) => {
                            return <UserListRow data={element} key={id} counter={id + 1} delModal={setDeleteModal} user={setUser}/>
                        })}
                      </tbody>
                  </table>
              </div>
          </div>
          { DeleteModal === true ?
            handleDelete(User) : <></>
          }
      </div>
  )
}

export default Clients