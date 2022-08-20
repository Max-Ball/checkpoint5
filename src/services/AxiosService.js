import Axios from 'axios'
import { baseURL } from '../env'
export const sandBoxApi = Axios.create({
  baseURL,
  timeout: 8000
})
