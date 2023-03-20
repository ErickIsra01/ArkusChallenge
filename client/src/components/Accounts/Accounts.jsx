import React from 'react'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { deleteAccount, getAccounts } from '../../services/accounts'
import AccountListRow from './AccountListRow';
import Swal from 'sweetalert2';

function Accounts() {
  const navigate = useNavigate();

  const [allAccounts, setallAccounts] = useState([]);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [Account, setAccount] = useState('');

  useEffect(() => {
      getAccounts().then((response) => {
        setallAccounts(response.data);
      })
  }, [DeleteModal])

  function handleDelete(id){

    Swal.fire({
      title: '¿Quieres eliminar esta cuenta?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Borrar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isDenied) {
        deleteAccount(id).then(() => {
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
                      <thead className="bg-gray-90">
                          <tr>
                              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">#</th>
                              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Cuenta</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Cliente</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Responsable</th>
                              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Opciones</th>
                              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                                <NavLink to={'/createAccount'}>
                                  <img src="/add-square-svgrepo-com (1).png" className="w-7 pt-1 stroke-white" alt="" />
                                </NavLink>
                              </th>
                              
                              
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {allAccounts.map((element, id) => {
                          return <AccountListRow data={element} key={id} counter={id + 1} delModal={setDeleteModal} account={setAccount}/>
                        })} 
                      </tbody>
                  </table>
              </div>
          </div>
          {DeleteModal === true ? handleDelete(Account) : <></>}
      </div>
  )
}

export default Accounts