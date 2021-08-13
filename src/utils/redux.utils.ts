import { applySpec, has, identity, ifElse, keys, path, pipe, prop } from 'ramda'

import { objFromListWith } from './ramda.utils'

export const normalise = pipe(
  objFromListWith(ifElse(has('key'), prop('key'), prop('id'))),
  applySpec({
    entities: identity,
    ids: keys,
  }),
)

export const extractDataFromPayload = path(['payload', 'data', 'data'])
