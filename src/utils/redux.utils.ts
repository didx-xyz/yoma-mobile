import { UserCredentialFormValues } from 'modules/User/User.types'
import { applySpec, concat, identity, keys, mergeDeepWith, mergeRight, objOf, path, pick, pipe, prop } from 'ramda'

import { objFromListWith } from './ramda.utils'

export const normalise = (data: Record<string, any>[], identifier = 'id') =>
  pipe(
    objFromListWith(prop(identifier)),
    applySpec({
      entities: identity,
      ids: keys,
    }),
  )(data)

export const updateStateWithFormValues = (state: Record<string, any>, formValues: UserCredentialFormValues) =>
  pipe(objOf('formValues'), mergeRight(state))(formValues)

export const updateNormalisedState = (state: Record<string, any>, payload: Record<string, any>) =>
  mergeDeepWith(concat, state, payload)

export const selectNormalised = pick(['ids', 'entities'])
export const extractId = path(['payload', 'id'])
export const extractDataFromPayload = path(['payload', 'data', 'data'])
export const extractEntitiesFromPayload = path(['payload', 'entities'])
