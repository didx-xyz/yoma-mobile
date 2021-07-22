import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import * as AuthActions from '../Auth/Auth.reducer'
import { AuthRegistration } from '../Auth/Auth.types'
import RegisterWithEmail from './RegisterWithEmail'

const mapStateToProps = null
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onRegisterUser: (details: AuthRegistration) => {
    dispatch(AuthActions.register(details))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterWithEmail)
