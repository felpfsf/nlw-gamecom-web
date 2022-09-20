import axios from 'axios'

const API_URL = 'http://localhost:3333/'

export const httpRequest = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  }
})
