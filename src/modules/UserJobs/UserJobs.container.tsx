import { connect } from 'react-redux'

import UserJobs from './UserJobs'
import selector from './UserJobs.selector'

const mapStateToProps = selector
const mapDispatchToProps = () => {
  return {
    onJobCreate: () => {},
    filterSkillsByName: () => {},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserJobs)
