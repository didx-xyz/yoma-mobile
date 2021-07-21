import { connect } from 'react-redux'

import Experience from './Experience'
import selector from './Experience.selector'

const mapStateToProps = selector
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Experience)
