import { pathOr, pick, pipe, prop } from 'ramda'

import { renameKeys } from '~/utils/ramda.utils'

export const extractCredentialsFromAuthorizedPayload = pipe(
  prop(['payload']),
  pick([
    'accessToken',
    'accessTokenExpirationDate',
    'idToken',
    'scopes',
    'tokenAdditionalParameters',
    'tokenType',
    'authorizeAdditionalParameters',
  ]),
)
export const prepareCredentials = renameKeys({
  accessToken: 'token',
  accessTokenExpirationDate: 'expiresAt',
})
export const extractRefreshTokenFromAuthorizedPayload = pathOr('', ['payload', 'refreshToken'])
export const extractMessageFromErrorPayload = pathOr('', ['payload', 'data', 'meta', 'message'])
export const selectLoginCredentialsFromRegistration = pick(['email', 'password'])
