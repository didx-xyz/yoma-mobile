import { AxiosInstance } from 'axios'

const auth = (instance: AxiosInstance) => {
  return {
    login(body: object, config = {}) {
      return instance.post('auth/login', body, config)
    },

    loginSocial(body: object, config = {}) {
      return instance.post('auth/login-social', body, config)
    },

    register(body: object, config = {}) {
      return instance.post('auth/register', body, config)
    },

    registerSocial(body: object, config = {}) {
      return instance.post('auth/register-social', body, config)
    },

    resetPassword(body: object, config = {}) {
      return instance.post('auth/password-reset', body, config)
    },
  }
}

export default auth
