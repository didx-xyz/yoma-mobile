import { API_BASE_USERS } from 'api/api.constants'
import { AxiosInstance } from 'axios'

import credentials from './credentials'
import password from './password'
import photo from './photo'
import * as constants from './users.constants'
import * as types from './users.types'

export default function (instance: AxiosInstance) {
  return {
    edit(userId: string, body: any, config = {}) {
      return instance.patch(`${API_BASE_USERS}/${userId}`, body, config)
    },
    getById(userId: string, config = {}) {
      return instance.get(`${API_BASE_USERS}/${userId}`, config)
    },
    password: password(instance),
    photo: photo(),
    credentials: credentials(instance),
  }
}

export { constants, types }
