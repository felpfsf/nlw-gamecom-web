import axios from 'axios'

const API_URL = 'http://192.168.15.16:3333/'

export const httpRequest = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  }
})
