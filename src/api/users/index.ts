import { AxiosInstance } from 'axios'

import password from './password'
import photo from './photo'

export default function (instance: AxiosInstance) {
  return {
    password: password(instance),
    photo: photo(instance),
  }
}
