import { connect } from 'react-redux'

import AppNavigation from './AppNavigation'
import selectIsAuthenticated from './AppNavigation.selector'

const mapStateToProps = selectIsAuthenticated
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation as any)
