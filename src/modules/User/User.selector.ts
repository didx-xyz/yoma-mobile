import { createSelector } from '@reduxjs/toolkit'
import { applySpec, mergeDeepRight, pipe, prop, propOr, __ } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectUserState = (state: RootState) => state.user

export const selectBiography = createSelector(selectUserState, propOr('', 'biography'))
export const selectUserUpdateCredentials = (action: any) =>
  createSelector(
    selectUserState,
    pipe(
      applySpec({
        firstName: prop('firstName'),
        lastName: prop('lastName'),
        phoneNumber: prop('phoneNumber'),
        countryAlpha2: prop('countryAlpha2'),
        biography: prop('biography'),
      }),
      mergeDeepRight(__, action.payload),
    ),
  )
