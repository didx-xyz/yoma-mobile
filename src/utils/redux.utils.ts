import { applySpec, identity, keys, path, pipe, prop } from 'ramda'

import { objFromListWith } from './ramda.utils'

export const normalise = pipe(
  objFromListWith(prop('id')),
  applySpec({
    entities: identity,
    ids: keys,
  }),
)
export const normaliseByValue = pipe(
  objFromListWith(prop('value')),
  applySpec({
    allValues: keys,
    byValue: identity,
  }),
)
export const normaliseByKey = pipe(
  objFromListWith(prop('key')),
  applySpec({
    allKeys: keys,
    byKey: identity,
  }),
)

export const extractDataFromPayload = path(['payload', 'data', 'data'])
