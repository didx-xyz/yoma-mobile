import { AxiosInstance } from 'axios'

import credentials from './credentials'
import password from './password'
import photo from './photo'

export default function (instance: AxiosInstance) {
  return {
    edit(userId: string, body: any, config = {}) {
      return instance.patch(`users/${userId}`, body, config)
    },

    getById(userId: string, config = {}) {
      return instance.get(`users/${userId}`, config)
    },

    password: password(instance),
    photo: photo(),

    credentials: credentials(instance),
  }
}
