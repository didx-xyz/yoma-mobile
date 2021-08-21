import { connect } from 'react-redux'

import UserJobs from './UserJobs'
import selector from './UserJobs.selector'

const mapStateToProps = selector
const mapDispatchToProps = () => {
  return {
    onJobCreate: () => {},
    filterSkillsByValue: () => {},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserJobs)
