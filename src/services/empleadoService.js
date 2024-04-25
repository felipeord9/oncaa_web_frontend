import axios from 'axios'
import { config } from "../config";

const url = `${config.apiUrl2}/empleados`;

export const findEmpleados = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}