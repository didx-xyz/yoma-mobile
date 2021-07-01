import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { actions as AuthActions } from '../Auth'
import Profile from './Profile'

const mapStateToProps = null
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogoutUser: () => {
      dispatch(AuthActions.authLogout())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
