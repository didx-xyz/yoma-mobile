import { AxiosInstance } from 'axios'

import workExperience from './workExperience'

export default function (instance: AxiosInstance) {
  return {
    workExperience: workExperience(instance),
  }
}
