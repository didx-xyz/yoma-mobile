import { applySpec, identity, ifElse, is, keys, of, path, pipe, prop } from 'ramda'

import { objFromListWith } from './ramda.utils'

export const normalise = pipe(
  ifElse(is(Array), identity, of),
  objFromListWith(prop('id')),
  applySpec({
    entities: identity,
    ids: keys,
  }),
)

export const extractDataFromPayload = path(['payload', 'data', 'data'])
