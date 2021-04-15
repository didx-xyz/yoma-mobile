import { API_BASE_USERS, API_PART_CREDENTIALS } from 'api/api.constants'
import { generateEndpoint } from 'api/api.utils'
import { AxiosInstance, AxiosRequestConfig } from 'axios'

export default function (instance: AxiosInstance) {
  return {
    getByType(userId: string, type: string, config: AxiosRequestConfig = {}) {
      return instance.get(`users/${userId}/credentials?type=${type}`, config)
    },

    getById(userId: string, credentialId: string, config: AxiosRequestConfig = {}) {
      return instance.get(generateEndpoint([API_BASE_USERS, userId, API_PART_CREDENTIALS, credentialId]), config)
    },

    create(userId: string, body: any, config: AxiosRequestConfig = {}) {
      return instance.post(generateEndpoint([API_BASE_USERS, userId, API_PART_CREDENTIALS]), body, config)
    },
  }
}
