import { path, pick, pipe, tap } from 'ramda'

export const getCredentialsFromAuthSuccess = pipe(
  path(['payload', 'data']),
  pick(['refreshToken', 'token', 'expiresAt', 'user']),
)
