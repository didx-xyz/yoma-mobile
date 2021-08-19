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

export const extractUpdatedNormalisedState = (
  normalisedUpdate: Record<string, any>,
  normalisedState: Record<string, any>,
) => mergeDeepWith(concat, normalisedState, normalisedUpdate)

export const extractNormalisedEntitiesFromState = pick(['ids', 'entities'])

export const extractDataFromPayload = path(['payload', 'data', 'data'])
