import { connect } from 'react-redux'

import About from './About'
import selector from './About.selector'

const mapStateToProps = selector
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(About)
