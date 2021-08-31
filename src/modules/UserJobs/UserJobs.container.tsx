import { createJob } from 'modules/Jobs/Jobs.reducer'
import { JobsRequest } from 'modules/Jobs/Jobs.types'
import { setFilterSearchTerm } from 'modules/Skills/Skills.reducer'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import UserJobs from './UserJobs'
import selector from './UserJobs.selector'

const mapStateToProps = selector
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onJobCreate: (job: JobsRequest) => {
      dispatch(createJob(job))
    },
    onJobPatch: () => {},
    onFilterSkills: (searchTerm: string) => {
      dispatch(setFilterSearchTerm(searchTerm))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserJobs)
