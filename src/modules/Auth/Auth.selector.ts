import { equals, not, pathOr } from 'ramda'

import { RootState } from './../../redux/redux.types'

export const authSelector = pathOr(null, ['auth', 'user'])
export const tokenSelector = pathOr('', ['auth', 'token'])
export const isAuthenticatedSelector = (state: RootState) => not(equals(pathOr(false, ['auth', 'token'], state), ''))

export default { authSelector, tokenSelector, isAuthenticatedSelector }
