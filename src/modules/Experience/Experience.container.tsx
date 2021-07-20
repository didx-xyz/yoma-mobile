import { connect } from 'react-redux'

import selector from '../Credentials/Credentials.selector'
import Experience from './Experience'

const mapStateToProps = selector
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Experience)
