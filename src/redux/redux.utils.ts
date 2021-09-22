import { PayloadAction } from '@reduxjs/toolkit'
import { applySpec, concat, evolve, identity, keys, mergeDeepRight, path, pick, pipe, prop, uniq } from 'ramda'

import * as Types from '../types/general.types'
import { objFromListWith } from '../utils/ramda.utils'
import { NormalisedData } from './redux.types'

export const normalise = (data: Types.StdObj[], identifier = 'id') =>
  pipe(
    objFromListWith(prop(identifier)),
    applySpec({
      entities: identity,
      ids: keys,
    }),
  )(data)

export const updateNormalisedReducer = (state: Types.StdObj, action: PayloadAction<NormalisedData<any>>) =>
  pipe(
    evolve({
      ids: pipe(concat(state.ids), uniq),
    }),
    mergeDeepRight(state),
  )(action.payload)

export const selectNormalised = pick(['ids', 'entities'])
export const extractId = path(['payload', 'id'])
export const extractDataFromResponseAction = path(['payload', 'data', 'data'])
export const extractEntitiesFromNormalisedAction = path(['payload', 'entities'])
