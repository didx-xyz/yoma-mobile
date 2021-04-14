import { AUTH_TOKEN } from 'helpers/helpers'
import RNFetchBlob from 'rn-fetch-blob'

import Env from '../../../env.json'

export default function () {
  return {
    create(userId: string, photo: object) {
      return RNFetchBlob.fetch(
        'POST',
        `${Env.YOMA_API_BASE_PATH}users/${userId}/photo`,
        {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          'Content-Type': 'multipart/form-data',
        },
        [photo],
      ).catch(err => {
        console.log('err', err)
        throw err
      })
    },
  }
}
