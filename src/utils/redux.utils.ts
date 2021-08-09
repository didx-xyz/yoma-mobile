import { PayloadAction } from '@reduxjs/toolkit'
import { applySpec, identity, keys, path, pipe, prop } from 'ramda'

import { objFromListWith } from './ramda.utils'

export const normalise = pipe(
  objFromListWith(prop('id')),
  applySpec({
    entities: identity,
    ids: keys,
  }),
)

export const extractDataFromPayload = path(['payload', 'data', 'data'])
