import axios from 'axios'
import { config } from "../config";

const url = `${config.apiUrl2}/clientes`;
const url2 = `${config.apiUrl2}/upload`;
const url3 = `${config.apiUrl2}/compare`;

export const findClientes = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const findOneClientes = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const findByCedula = async (cedula) => {
  const { data } = await axios.get(`${url}/cedula/${cedula}`)
  return data
}

export const findByOncaaID = async (oncaaId) => {
  const { data } = await axios.get(`${url}/oncaa/id/${oncaaId}`)
  return data
}

export const createCliente = async (body) => {
  const token = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const updateCliente = async (id, body) => {
  const token = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.patch(`${url}/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const fileSend = async(id, formData) =>{
  try {
      const { data }= await axios.post(`${url2}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return data;
    } catch (error) {
      throw error;
    }
  }

export const CompareB64 = async(formData) =>{
  try{
    const { data }= await axios.post(`${url3}/huella`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return data;
  }catch (error) {
    throw error;
  }
}

 export const deleteCliente = (id) => {
    return fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => res);
  };
