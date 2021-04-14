import { AxiosInstance, AxiosRequestConfig } from 'axios'

export default function (instance: AxiosInstance) {
  return {
    getAll(config = {}) {
      return instance.get('jobs', config)
    },

    getById(jobId: string, config: AxiosRequestConfig) {
      return instance.get(`jobs/${jobId}`, config)
    },

    editJob(jobId: string, body: object, config: AxiosRequestConfig = {}) {
      return instance.patch(`jobs/${jobId}`, body, config)
    },

    /**
     * Create work experience
     * @param {object} body { "title": "string", "description": "string", "organisationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6", "skillNames": [ "string" ] }
     * @param {object} config
     */
    create(body: any, config = {}) {
      return instance.post('jobs', body, config)
    },
  }
}
