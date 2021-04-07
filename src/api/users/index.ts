import { AxiosInstance } from 'axios'

import password from './password'
import photo from './photo'

export default function (instance: AxiosInstance) {
  return {
    edit(userId: string, body: any, config = {}) {
      return instance.patch(`users/${userId}`, body, config)
    },
    password: password(instance),
    photo: photo(),
  }
}
