import { isAuthenticatedSelector } from 'modules/Auth/Auth.selector'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from 'redux/redux.types'

import AppNavigation from './AppNavigation'

const mapStateToProps = (state: RootState, props: any) => {
  return {
    ...props,
    isAuthenticated: isAuthenticatedSelector(state),
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation)
