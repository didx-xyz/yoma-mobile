import { Dispatch } from '@reduxjs/toolkit'
import { actions as JobActions, types as JobTypes } from 'modules/Job'
import { connect } from 'react-redux'

import Experience from './Experience'
import selector from './Experience.selector'

const mapStateToProps = selector
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onJobCreate: (job: JobTypes.JobRequestPayload) => {
      dispatch(JobActions.createJob(job))
    },
    onJobUpdate: (job: JobTypes.JobUpdatePayload) => {
      dispatch(JobActions.updateJob(job))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experience)
