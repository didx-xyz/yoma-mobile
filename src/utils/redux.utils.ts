import { applySpec, concat, identity, keys, mergeDeepWith, path, pick, pipe, prop } from 'ramda'

import * as Types from '../types/general.types'
import { objFromListWith } from './ramda.utils'

export const normalise = (data: Types.StdObj[], identifier = 'id') =>
  pipe(
    objFromListWith(prop(identifier)),
    applySpec({
      entities: identity,
      ids: keys,
    }),
  )(data)

export const updateNormalisedState = (state: Types.StdObj, payload: Types.StdObj) =>
  mergeDeepWith(concat, state, payload)

export const selectNormalised = pick(['ids', 'entities'])
export const extractId = path(['payload', 'id'])
export const extractDataFromResponseAction = path(['payload', 'data', 'data'])
export const extractEntitiesFromNormalisedAction = path(['payload', 'entities'])
