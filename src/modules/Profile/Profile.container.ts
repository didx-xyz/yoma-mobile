import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { actions as AuthActions } from '../Auth'
import Profile from './Profile'
import selector from './Profile.selector'

const mapStateToProps = selector
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogoutUser: () => {
      dispatch(AuthActions.authLogout())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
