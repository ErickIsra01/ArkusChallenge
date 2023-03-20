import React from "react";
import { useState, useEffect } from "react";
import { deleteTeam, getTeams } from "../../services/teams";
import TeamCards from "./TeamCards";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";


function Teams() {
  const [Teams, setTeams] = useState([]);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [Team, setTeam] = useState('');

  useEffect(() => {
    getTeams().then((response) => {
      setTeams(response.data);
    })
  }, [DeleteModal])

  function handleDelete(id){

    Swal.fire({
      title: '¿Quieres eliminar este equipo?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Borrar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isDenied) {
        deleteTeam(id).then(() => {
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
    <>
    <div className="flex justify-end h-10">
      <NavLink to={'/createTeam'}>
        <img src="/add-square-svgrepo-com (1).png" className="w-7 pt-1 mr-2 stroke-white " alt="" />
      </NavLink>
    </div>
    <div className="mb-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-10">
        {Teams.map((element, id) => {
          return <TeamCards data={element} key={id} counter={id} delModal={setDeleteModal} team={setTeam}/>
        })}
      </div>
    </div>
    {DeleteModal === true ? handleDelete(Team) : <></>}
  </>
  );
}

export default Teams;
