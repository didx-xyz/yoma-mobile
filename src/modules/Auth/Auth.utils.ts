import { path, pathOr, pick, pipe } from 'ramda'

export const selectCredentialsFromLoginPayload = pipe(path(['payload', 'data']), pick(['token', 'expiresAt']))

export const selectRefreshTokenFromLoginPayload = pathOr(null, ['payload', 'data', 'refreshToken'])
