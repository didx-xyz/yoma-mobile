import { selectJobEntities } from 'modules/Job/Job.selector'
import { createSelector } from 'reselect'

export default createSelector(selectJobEntities, jobEntities => ({
  jobs: jobEntities,
}))
