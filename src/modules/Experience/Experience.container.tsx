import { Dispatch } from '@reduxjs/toolkit'
import { actions as JobActions, types as JobTypes } from 'modules/Job'
import { actions as SkillsActions } from 'modules/Skills'
import { connect } from 'react-redux'

import Experience from './Experience'
import selector from './Experience.selector'

const mapStateToProps = selector
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onJobCreate: (job: JobTypes.JobRequestPayload) => {
      dispatch(JobActions.createJob(job))
    },
    filterSkillsByName: (query: string) => {
      dispatch(SkillsActions.filterSkillsByName(query))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experience)
