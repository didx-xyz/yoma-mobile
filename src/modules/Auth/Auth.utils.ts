import { path, pick, pipe } from 'ramda'

export const selectCredentialsFromLoginPayload = pipe(path(['payload', 'data']), pick(['token', 'expiresAt']))

export const selectRefreshTokenFromLoginPayload = pipe(path(['payload', 'data']), pick(['refreshToken']))
