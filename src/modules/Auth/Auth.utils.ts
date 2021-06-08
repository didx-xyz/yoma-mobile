import { path, pick, pipe } from 'ramda'

export const getCredentialsFromAuthSuccess = pipe(
  path(['payload', 'data']),
  pick(['refreshToken', 'token', 'expiresAt']),
)
