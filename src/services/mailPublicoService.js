import axios from 'axios'
import { config } from "../config";

const url = `${config.apiUrl2}/publico`;

export const sendMailPublico = async (body) => {
  const { data } = await axios.post(`${url}/send`,body)
  return data
}