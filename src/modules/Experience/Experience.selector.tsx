import { selectOrganisations } from 'modules/Organisations/Organisations.selector'
import { createSelector } from 'reselect'

export default createSelector(selectOrganisations, organisations => ({
  organisations,
}))
