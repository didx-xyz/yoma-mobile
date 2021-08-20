import { applySpec, concat, identity, keys, mergeDeepWith, path, pick, pipe, prop } from 'ramda'

import { objFromListWith } from './ramda.utils'

export const normalise = (data: Record<string, any>[], identifier = 'id') =>
  pipe(
    objFromListWith(prop(identifier)),
    applySpec({
      entities: identity,
      ids: keys,
    }),
  )(data)

export const updateNormalisedState = (normalisedState: Record<string, any>, normalisedUpdate: Record<string, any>) =>
  mergeDeepWith(concat, normalisedState, normalisedUpdate)

export const selectNormalised = pick(['ids', 'entities'])
export const extractId = path(['payload', 'id'])
export const extractDataFromPayload = path(['payload', 'data', 'data'])
