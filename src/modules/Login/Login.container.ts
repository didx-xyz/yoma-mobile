import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import * as AuthActions from '../Auth/Auth.reducer'
import { AuthCredentials } from '../Auth/Auth.types'
import Login from './Login'

const mapStateToProps = null
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLoginUser: (details: AuthCredentials) => {
      dispatch(AuthActions.login(details))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
