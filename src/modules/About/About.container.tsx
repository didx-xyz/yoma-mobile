import selector from 'modules/About/About.selector'
import { connect } from 'react-redux'

import About from './About'

const mapStateToProps = selector
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(About)
