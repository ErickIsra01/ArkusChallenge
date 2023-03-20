import React from 'react'

function TeamCards({ data, counter, delModal, team }) {
  return (
            <div>
              <div className="md:order-2 relative before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition before:hover:border-2 before:hover:border-red-600 before:hover:shadow-lg after:absolute after:inset-x-0.5 after:bottom-0.5 after:z-10 after:w-[calc(100%-4px)] after:h-24 after:rounded-b-xl after:bg-gradient-to-t bg-red-700">
                <div className="relative overflow-hidden w-full h-full rounded-xl">
                  <div className="p-6 flex bg-white flex-col justify-between text-center rounded-xl dark:border-gray-700">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-900">
                        {data.teamName}
                      </h3>
                      <h4 className="mt-2 text-gray-500">
                        Assigned to:
                        <p className="text-black mt-5 text-md">
                          {data.accountData ? data.accountData.accountName : "No assigned to any account yet"}
                        </p>
                      </h4>
                    </div>
                    <div className="mt-8">
                    </div>
                  </div>
                  <div className="absolute top-1/2 -left-1/2 -z-[1] w-60 h-32 bg-purple-200 blur-[100px] -translate-y-1/2 dark:bg-violet-900/30"></div>
                </div>
              </div>
              <div className='flex justify-center'>
                <button type='button' onClick={() => (delModal(true), team(data._id))}>
                  <img src="https://www.svgrepo.com/show/494009/delete.svg" className='w-5 ml-3' alt="" />
                </button>
              </div>
            </div>
  )
}

export default TeamCards