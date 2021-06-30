import { SocialVariants } from 'components/SocialButton/SocialButton.types'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import * as AuthActions from '../Auth/Auth.reducer'
import Register from './Register'

const mapStateToProps = null
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onAuthWithSocial: (authProvider: SocialVariants) => {
      dispatch(AuthActions.authSocialRegistration(authProvider))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
