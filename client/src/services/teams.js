import axios from "axios";
import Swal from "sweetalert2";

export const getTeams = async () => {
  let auth = ''

  if(localStorage.getItem('token')) {
    auth = `Bearer ${localStorage.getItem('token')}`
  };

  try{
    const response = await axios.get(`${import.meta.env.VITE_API}/teams/getAllTeams`, { 
      headers: { Authorization: auth }
     });
    return response.data;
  }catch(error) {
    Swal.fire({
      icon: 'error',
      title: error.response.status,
      text: error.response.data,
      footer: '<a href="">Try reloading the page</a>'
    })

    throw error
  }
}

export const createTeam = async (data) => {
  let auth = ''

  if(localStorage.getItem('token')) {
    auth = `Bearer ${localStorage.getItem('token')}`
  };
  try{
    const response = await axios.post(`${import.meta.env.VITE_API}/teams/createTeam`, data,  { 
      headers: { Authorization: auth }
     });
    return response.data;
  }catch(error) {
    Swal.fire({
      icon: 'error',
      title: error.response.status,
      text: error.response.data,
      footer: '<a href="">Try reloading the page</a>'
    })

    throw error
  }
}

export const deleteTeam = async (id) => {
  let auth = ''

  if(localStorage.getItem('token')) {
    auth = `Bearer ${localStorage.getItem('token')}`
  };
  
  try{
    const teamDeleted = await axios.delete(`${import.meta.env.VITE_API}/teams/deleteTeam?idTeam=${id}`,  {
      headers: { Authorization: auth }
    })
    
    return teamDeleted;
  } catch(error) {
    throw ({error})
  }
}