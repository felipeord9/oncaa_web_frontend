import axios from 'axios'
import { config } from "../config";

const url = `${config.apiUrl2}/horarios`;

export const updateHorarios = async (id, body) => {
  const token = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.patch(`${url}/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}