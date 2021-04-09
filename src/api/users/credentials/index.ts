import { AxiosInstance, AxiosRequestConfig } from 'axios'

export default function (instance: AxiosInstance) {
  return {
    getByType(userId: string, type: string, config: AxiosRequestConfig = {}) {
      return instance.get(`users/${userId}/credentials?type=${type}`, config)
    },

    getById(userId: string, credentialId: string, config: AxiosRequestConfig = {}) {
      return instance.get(`users/${userId}/credentials/${credentialId}`, config)
    },
    create(userId: string, body: any, config: AxiosRequestConfig = {}) {
      return instance.post(`users/${userId}/credentials`, body, config)
    },
  }
}
