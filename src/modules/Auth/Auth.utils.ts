import { path, pathOr, pick, pipe } from 'ramda'

export const selectCredentialsFromLoginPayload = pipe(path(['payload', 'data', 'data']), pick(['token', 'expiresAt']))
export const selectRefreshTokenFromLoginPayload = pathOr('', ['payload', 'data', 'data', 'refreshToken'])
export const selectLoginCredentialsFromRegistration = pipe(pick(['email', 'password']))
