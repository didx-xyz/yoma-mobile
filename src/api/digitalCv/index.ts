import { AxiosInstance } from 'axios'

import organisations from './organisations'
import skills from './skills'
import workExperience from './workExperience'

export default function (instance: AxiosInstance) {
  return {
    workExperience: workExperience(instance),
    organisations: organisations(instance),
    skills: skills(instance),
  }
}
