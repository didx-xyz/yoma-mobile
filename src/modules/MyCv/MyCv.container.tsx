import { connect } from 'react-redux'

import MyCv from './MyCv'
import selector from './MyCv.selector'

const mapStateToProps = selector
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(MyCv)
