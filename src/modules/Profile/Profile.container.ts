import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import * as AuthActions from '../Auth/Auth.reducer'
import { actions as UserActions } from '../User'
import Profile from './Profile'
import selector from './Profile.selector'

const mapStateToProps = selector
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogoutUser: () => {
      dispatch(AuthActions.logout())
    },
    onProfileSave: (user: any) => {
      dispatch(UserActions.updateUser(user))
    },
    onPhotoSave: () => {
      dispatch(UserActions.uploadUserPhoto())
    },
  }
}

export default connect<any, any, any, any>(mapStateToProps, mapDispatchToProps)(Profile)
