import { path, pick, pipe } from 'ramda'

export const getCredentialsFromAuthSuccess = pipe(
  path(['payload', 'data', 'data']),
  pick(['refreshToken', 'token', 'expiresAt']),
)
