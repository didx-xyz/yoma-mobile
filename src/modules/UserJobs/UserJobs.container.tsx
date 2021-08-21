import { connect } from 'react-redux'

import UserJobs from './UserJobs'

const mapStateToProps = null
const mapDispatchToProps = () => {
  return {
    onJobCreate: () => {},
    onJobPatch: () => {},
    filterSkillsByValue: () => {},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserJobs)
