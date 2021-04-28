import { AxiosInstance, AxiosRequestConfig } from 'axios'

export default function (instance: AxiosInstance) {
  return {
    getAll(config: AxiosRequestConfig = {}) {
      return instance.get('organisations', config)
    },
    getKeyNames(config: AxiosRequestConfig = {}) {
      return instance.get('organisations/names', config)
    },
    getById(organisationId: string, config: AxiosRequestConfig = {}) {
      return instance.get(`organisations/${organisationId}`, config)
    },
    /**
     * Create organisation.
     * @param {object} body { "name": "string", "url": "string", "logoURL": "string", "primaryContactName": "string", "primaryContactEmail": "user@example.com" }
     * @param {*} config
     */
    create(body: any, config: AxiosRequestConfig = {}) {
      return instance.post('organisations', body, config)
    },
  }
}
