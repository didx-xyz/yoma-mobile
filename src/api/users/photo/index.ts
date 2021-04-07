import { BASE_URL } from 'api'
import RNFetchBlob from 'rn-fetch-blob'

export default function () {
  return {
    create(userId: string, photo: object) {
      return RNFetchBlob.fetch(
        'POST',
        `${BASE_URL}users/${userId}/photo`,
        {
          // TODO:Static token added
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVXNlciIsInVuaXF1ZV9uYW1lIjoiNWYyNTg4NDYtNmEzYi00YjJmLThjY2YtYjI1MWJlYWMwNjZiIiwibmJmIjoxNjE3Nzg2MDMzLCJleHAiOjE2MTc3ODc4MzMsImlhdCI6MTYxNzc4NjAzM30.qAlK7FNh-4sj-QyZdP-azuaUYKXjBC2jwCQcHlGhOjw',
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
