import { equals, not, pathOr } from 'ramda'

import { RootState } from './../../redux/redux.types'

export const isAuthenticatedSelector = (state: RootState) => not(equals(pathOr(false, ['auth', 'token'], state), ''))

export default { isAuthenticatedSelector }
