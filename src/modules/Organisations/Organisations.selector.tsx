import { createSelector } from '@reduxjs/toolkit'
import { pipe, prop, values } from 'ramda'

import { RootState } from '~/redux/redux.types'
import { mapToDropDownArray } from '~/utils/strings.utils'

import { types as DropDownTypes } from '../../components/DropDown'

export const selectOrganisations = (state: RootState) => state.organisations
export const selectOrganisationsList = createSelector<any, any, DropDownTypes.DropDownItem[]>(
  selectOrganisations,
  pipe(prop('entities'), values, (list: Record<string, string>[]) => mapToDropDownArray(list, 'key', 'value')),
)
