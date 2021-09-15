import { createSelector } from '@reduxjs/toolkit'
import { pipe } from 'ramda'
import { RootState } from 'redux/redux.types'
import { mapToDropDownArray } from 'utils/strings.utils'

import { types as DropDownTypes } from '../../components/DropDown'
import { selectFilterSkillsByTerm } from './Skills.utils'

export const selectSkills = (state: RootState) => state.skills
export const selectFiltered = createSelector<any, any, DropDownTypes.DropDownItem[]>(
  selectSkills,
  pipe(selectFilterSkillsByTerm, (list: Record<string, string>[]) => mapToDropDownArray(list, 'value', 'value')),
)
