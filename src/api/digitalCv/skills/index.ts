import { AxiosInstance, AxiosRequestConfig } from 'axios'

export default function (instance: AxiosInstance) {
  return {
    getAll(config: AxiosRequestConfig = {}) {
      return instance.get('skills', config)
    },
    getKeyNames(config: AxiosRequestConfig = {}) {
      return instance.get('skills/names', config)
    },
    getById(skillId: string, config: AxiosRequestConfig = {}) {
      return instance.get(`skills/${skillId}`, config)
    },

    /**
     * Create skill. Will need an organisation to create.
     * @param {object} body { name }
     * @param {*} config
     */
    create(body: any, config: AxiosRequestConfig = {}) {
      return instance.post('skills', body, config)
    },
  }
}
