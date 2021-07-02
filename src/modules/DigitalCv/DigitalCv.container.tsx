import selector from 'modules/About/About.selector'
import { connect } from 'react-redux'

import DigitalCv from './DigitalCv'

const mapStateToProps = selector
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(DigitalCv)
