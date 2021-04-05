import { AxiosInstance } from 'axios'

const password = (instance: AxiosInstance) => {
  return {
    edit(userId: string, body: object, config = {}) {
      return instance.patch(`users/${userId}/password`, body, config)
    },
  }
}

export default password
