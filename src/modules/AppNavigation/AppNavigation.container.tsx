import { connect } from 'react-redux'

import AppNavigation from './AppNavigation'
import selector from './AppNavigation.selector'

const mapStateToProps = selector
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation)
