import { AUTH_TOKEN, BASE_URL } from 'helpers/helpers'
import RNFetchBlob from 'rn-fetch-blob'

export default function () {
  return {
    create(userId: string, photo: object) {
      return RNFetchBlob.fetch(
        'POST',
        `${BASE_URL}users/${userId}/photo`,
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
