import { connect } from 'react-redux'

import Experience from './Experience'
import selector from './Experience.selector'

const mapStateToProps = selector
const mapDispatchToProps = () => {
  return {
    onJobCreate: () => {},
    filterSkillsByName: () => {},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experience)
