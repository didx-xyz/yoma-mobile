import { createDraftSafeSelector } from '@reduxjs/toolkit'

// import { prop } from 'ramda'
import { RootState } from '~/redux/redux.types'

export const selectOpportunities = (state: RootState) => state.opportunities
export const OpportunitiesSelector = createDraftSafeSelector(selectOpportunities, state => state)
// export const selectorOpp = createSelector(selectOpportunities, opportunities =>
//   opportunities.ids.map(id => opportunities.entities[id].value),
// )

// export const selectName = createSelector<any, string>(selectOpportunities, prop('organisationName'))
// export const selectTitle = createSelector<any, string>(selectOpportunities, prop('title'))
// export const selectId: (state: RootState) => string = createSelector(selectOpportunities, prop('id'))
// export const selectPhotoUrl = createSelector(selectOpportunities, prop('organisationLogoURL'))
// export const selectZltoBalance = createSelector(selectOpportunities, prop('zltoReward'))

// export default createSelector([selectPhotoUrl, selectZltoBalance, selectTitle, selectName, selectId ] => {
//   return {
//     selectPhotoUrl,
//     selectZltoBalance,
//     selectTitle,
//     selectName,
//     selectId
//   }
// })
