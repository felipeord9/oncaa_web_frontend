import axios from 'axios'
import { config } from "../config";

const url = `${config.apiUrl2}/empleados`;

export const updateEmplaedo = async (id, body) => {
  const token = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.patch(`${url}/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const findEmpleados = async () => {
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