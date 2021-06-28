import { SocialVariants } from 'components/SocialButton/SocialButton.types'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import * as AuthActions from '../Auth/Auth.reducer'
import { AuthCredentials } from '../Auth/Auth.types'
import Login from './Login'

const mapStateToProps = null
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLoginWithSocial: (authProvider: SocialVariants) => {
      dispatch(AuthActions.authSocialLogin(authProvider))
    },
    onLoginUser: (details: AuthCredentials) => {
      dispatch(AuthActions.authLogin(details))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login as any)
