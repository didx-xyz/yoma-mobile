import { createSelector } from '@reduxjs/toolkit'
import { pipe, prop, values } from 'ramda'

import { types as DropDownTypes } from '~/components/DropDown'
import { RootState } from '~/redux/redux.types'
import { mapToDropDownArray, sortDropDownArray } from '~/utils/arrays.utils'

export const selectOrganisations = (state: RootState) => state.organisations
export const selectOrganisationsList = createSelector<any, DropDownTypes.DropDownItem[]>(
  selectOrganisations,
  pipe(prop('entities'), values, mapToDropDownArray, sortDropDownArray),
)
