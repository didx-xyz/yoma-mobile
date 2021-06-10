import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from 'redux/redux.types'

import * as AuthActions from '../Auth/Auth.reducer'
import Profile from './Profile'

const mapStateToProps = (state: RootState, props: any) => {
  return {
    ...props,
    user: state.auth.user,
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogoutUser: () => {
      dispatch(AuthActions.authLogout())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
