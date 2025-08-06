import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'https://fis-staging.ondc.org/rsf-utility/',
})

export default instance
