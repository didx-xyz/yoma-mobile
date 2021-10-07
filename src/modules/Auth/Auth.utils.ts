import { path, pathOr, pick, pipe } from 'ramda'

export const extractCredentialsFromAuthorizedPayload = pipe(
  path(['payload', 'data', 'data']),
  pick(['token', 'expiresAt']),
)
export const extractRefreshTokenFromAuthorizedPayload = pathOr('', ['payload', 'data', 'data', 'refreshToken'])
export const extractMessageFromErrorPayload = pathOr('', ['payload', 'data', 'meta', 'message'])
export const selectLoginCredentialsFromRegistration = pick(['email', 'password'])
