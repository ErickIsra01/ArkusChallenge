import axios from "axios";
import Swal from "sweetalert2";

export const getAccounts = async () => {
  let auth = ''

  if(localStorage.getItem('token')) {
    auth = `Bearer ${localStorage.getItem('token')}`
  };
  
  try{
    const response = await axios.get(`${import.meta.env.VITE_API}/accounts/getAllAccounts`, { 
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

export const createAccount = async (data) => {
  let auth = ''

  if(localStorage.getItem('token')) {
    auth = `Bearer ${localStorage.getItem('token')}`
  };
  try{
    const response = await axios.post(`${import.meta.env.VITE_API}/accounts/createAccount`, data,  { 
      headers: { Authorization: auth }
     });
    return response.data;
  }catch(error) {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: error.response.status,
      text: error.response.data,
      footer: '<a href="">Try reloading the page</a>'
    })

    throw error
  }
}

export const deleteAccount = async (id) => {
  let auth = ''

  if(localStorage.getItem('token')) {
    auth = `Bearer ${localStorage.getItem('token')}`
  };
  
  try{
    const accountDeleted = await axios.delete(`${import.meta.env.VITE_API}/accounts/deleteAccount?idAccount=${id}`,  {
      headers: { Authorization: auth }
    })
    
    return accountDeleted;
  } catch(error) {
    throw ({error})
  }
}