import axios from 'axios';
import Swal from 'sweetalert2';

export const login = async (values) => {
  let auth = ''

  if(localStorage.getItem('token')) {
    auth = `Bearer ${localStorage.getItem('token')}`
  };

  try{
    const API = import.meta.env.VITE_API;
    const response = await axios.post(`${API}/session/login`, { email: values.email, password: values.password });

    return response.data;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: error.response.data.message,
      footer: '<a href="">Try reloading the page</a>'
    })

    throw error
  }
};

export const verifyAuthorization = async (values) => {
  let auth = ''

  if(localStorage.getItem('token')) {
    auth = `Bearer ${localStorage.getItem('token')}`
  };

  try{
    const API = import.meta.env.VITE_API;
    const respose = await axios.post(`${API}/session/verify`, {}, {
      headers: { Authorization: auth }
    });
  } catch (error) {
    throw error
  }
};

