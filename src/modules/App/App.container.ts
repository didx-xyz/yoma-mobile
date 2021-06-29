import { connect } from 'react-redux'

import App from './App'
import selector from './App.selector'

const mapStateToProps = selector
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(App)
