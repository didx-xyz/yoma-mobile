import { createSelector } from '@reduxjs/toolkit'
import { curry, pipe, prop, values } from 'ramda'
import { RootState } from 'redux/redux.types'
import { mapToDropDownArray } from 'utils/strings.utils'

export const selectOrganisations = (state: RootState) => state.organisations
export const selectOrganisationsList = createSelector(
  selectOrganisations,
  pipe(
    prop('entities'),
    values,
    curry((id: any) => mapToDropDownArray(id, 'key', 'value')),
  ),
)
