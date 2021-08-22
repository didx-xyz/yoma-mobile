import { applySpec, identity, keys, path, pick, pipe, prop } from 'ramda'

import { objFromListWith } from './ramda.utils'

export const normalise = (data: Record<string, any>[], identifier = 'id') =>
  pipe(
    objFromListWith(prop(identifier)),
    applySpec({
      entities: identity,
      ids: keys,
    }),
  )(data)

export const selectNormalised = pick(['ids', 'entities'])
export const extractEntitiesFromPayload = path(['payload', 'entities'])

export const extractDataFromPayload = path(['payload', 'data', 'data'])
