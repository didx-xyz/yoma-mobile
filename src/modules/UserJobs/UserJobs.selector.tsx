import { createSelector } from '@reduxjs/toolkit'
import { selectOrganisations, selectOrganisationsList } from 'modules/Organisations/Organisations.selector'
import { selectFiltered } from 'modules/Skills/Skills.selector'
import { map, pick, pipe, prop, values } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectUserJobs = (state: RootState) => state.userJobs
export const selectFormValues = createSelector(selectUserJobs, prop(['formValues']))

export const selectUserJobItems = createSelector(
  selectUserJobs,
  pipe(prop('entities'), values, map(pick(['job', 'startDate', 'endDate']))),
)

export default createSelector(
  selectUserJobItems,
  selectOrganisationsList,
  selectFiltered,
  (userJobs, organisations, skills) => ({
    userJobs,
    organisations,
    skills,
  }),
)
