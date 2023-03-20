import React from 'react'

function AccountListRow({data, counter, delModal, account}) {
  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6">{counter}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm">{data.accountName}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm">{data.clientName}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm">{data.responsableName}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm">
          <span className="flex justify-center">
            <button>
              <img src="https://www.svgrepo.com/show/6755/edit.svg" className="w-5 mr-3" alt="" />
            </button>
            <button onClick={() => (delModal(true), account(data._id))}>
              <img src="https://www.svgrepo.com/show/494009/delete.svg" className='w-5 ml-3' alt="" />
            </button>
          </span>
      </td>
    </tr>
  )
}

export default AccountListRow