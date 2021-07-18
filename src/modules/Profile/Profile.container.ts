import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { actions as AuthActions } from '../Auth'
import { actions as UserActions } from '../User'
import Profile from './Profile'
import selector from './Profile.selector'

const mapStateToProps = selector
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogoutUser: () => {
      dispatch(AuthActions.authLogout())
    },
    onProfileSave: (user: any) => {
      dispatch(UserActions.updateUser(user))
    },
    onPhotoSave: () => {
      dispatch(UserActions.updateUserPhoto())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
