import { append, applySpec, identity, ifElse, is, keys, path, pipe, prop, __ } from 'ramda'

import { objFromListWith } from './ramda.utils'

export const normalise = pipe(
  ifElse(is(Array), identity, append(__, [])),
  objFromListWith(prop('id')),
  applySpec({
    entities: identity,
    ids: keys,
  }),
)

export const extractPayloadData = path(['payload', 'data', 'data'])
