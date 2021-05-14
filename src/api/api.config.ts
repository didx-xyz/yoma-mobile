import axios from 'axios'

import Env from '../env.json'
import { apiCall } from './api.utils'

const instance = axios.create({
  baseURL: Env.YOMA_API_BASE_PATH,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const createApiClient = apiCall(instance)
