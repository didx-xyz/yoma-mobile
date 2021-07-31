import { applySpec, identity, keys, pipe, prop } from 'ramda'

import { objFromListWith } from './ramda.utils'

export const normalise = pipe(
  objFromListWith(prop('id')),
  applySpec({
    entities: identity,
    ids: keys,
  }),
)
