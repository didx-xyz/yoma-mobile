import { connect } from 'react-redux'

import Navigation from './Navigation'
import selector from './Navigation.selector'

const mapStateToProps = selector
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Navigation as any)
