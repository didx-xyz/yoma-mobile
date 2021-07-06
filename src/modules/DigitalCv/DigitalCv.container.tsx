import { connect } from 'react-redux'

import DigitalCv from './DigitalCv'
import selector from './DigitalCv.selector'

const mapStateToProps = selector
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(DigitalCv)
