import { PayloadAction } from '@reduxjs/toolkit'
import {
  applySpec,
  ascend,
  concat,
  evolve,
  identity,
  keys,
  mergeDeepRight,
  path,
  pick,
  pipe,
  prop,
  sort,
  uniq,
} from 'ramda'

import { utils as ApiUtils } from '~/api'
import { selectId } from '~/modules/User/User.selector'
import * as Types from '~/types/general.types'
import { StdObj } from '~/types/general.types'
import { objFromListWith } from '~/utils/ramda.utils'

import { NormalisedData, RootState } from './redux.types'

export const actionName = (reducerName: string) => (action: string) => `${reducerName} ${action}`

export const normalise = (data: Types.StdObj[], identifier = 'id') =>
  pipe(
    objFromListWith(prop(identifier)),
    applySpec({
      entities: identity,
      ids: keys,
    }),
  )(data)

export const normaliseFn =
  (identifier = 'id') =>
  (data: Types.StdObj[]) =>
    normalise(data, identifier)

export const updateNormalisedReducer = (state: Types.StdObj, action: PayloadAction<NormalisedData<any>>) =>
  pipe(
    evolve({
      ids: pipe(concat(state.ids), uniq),
    }),
    mergeDeepRight(state),
  )(action.payload)

export const sortIDs = sort(ascend(identity))
export const selectNormalised = pick(['ids', 'entities'])
export const extractIdFromAction = path(['payload', 'id'])
export const extractDataFromResponseAction = path(['payload', 'data', 'data'])
export const extractEntitiesFromNormalisedAction = path(['payload', 'entities'])
export const buildConfig = (preset: StdObj, state: RootState) =>
  pipe(selectId, ApiUtils.prependValueToEndpointInConfig(preset))(state)
