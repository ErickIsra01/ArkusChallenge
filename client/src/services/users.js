import axios from "axios";
import Swal from "sweetalert2";

export const getUsers = async () => {
  let auth = ''

  if(localStorage.getItem('token')) {
    auth = `Bearer ${localStorage.getItem('token')}`
  };

  try{
    const response = await axios.get(`${import.meta.env.VITE_API}/users/getAllUsers`, { 
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

export const getOneUser = async (id) => {
  let auth = ''

  if(localStorage.getItem('token')) {
    auth = `Bearer ${localStorage.getItem('token')}`
  };

  try{
    const response = await axios.get(`${import.meta.env.VITE_API}/users/getOneUser?idUser=${id}`, { 
      headers: { Authorization: auth }
     });
    return response.data;
  }catch(error) {
    Swal.fire({
      icon: 'error',
      title: error.response.status,
      text: error.response.data,
      footer: '<a href="">Try no estoy aqui</a>'
    })
    throw error
  }
}

export const createUser = async (data) => {
  let auth = ''

  if(localStorage.getItem('token')) {
    auth = `Bearer ${localStorage.getItem('token')}`
  };

  try{
    const userCreated = await axios.post(`${import.meta.env.VITE_API}/users/createUser`, {data: data},  {
      headers: { Authorization: auth }
    })

    return userCreated;
  } catch(error) {
    throw ({error})
  }
}

export const deleteUser = async (id) => {
  let auth = ''

  if(localStorage.getItem('token')) {
    auth = `Bearer ${localStorage.getItem('token')}`
  };
  
  try{
    const userCreated = await axios.delete(`${import.meta.env.VITE_API}/users/deleteUser?idUser=${id}`,  {
      headers: { Authorization: auth }
    })

    return userCreated;
  } catch(error) {
    throw ({error})
  }
}