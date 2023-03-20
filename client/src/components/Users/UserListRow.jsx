import React, { useState } from 'react'
import { deleteUser } from '../../services/users'
import Swal from 'sweetalert2';
import { deleteModel } from 'mongoose';

function UserListRow({ data, counter, delModal, user }) {

  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6">{counter}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm">{data.name}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm">{data.email}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm">
          <span className="flex justify-center">
            <button type='button'>
              <img src="https://www.svgrepo.com/show/6755/edit.svg" className="w-5 mr-3" alt="" />
            </button>
            <button type='button'  onClick={() => (delModal(true), user(data._id))}>
              <img src="https://www.svgrepo.com/show/494009/delete.svg" className='w-5 ml-3' alt="" />
            </button>
          </span>
      </td>
    </tr>
  )
}

export default UserListRow