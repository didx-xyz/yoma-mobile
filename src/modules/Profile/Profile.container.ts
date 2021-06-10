import { AuthCredentialsResponse } from 'modules/Auth/Auth.types'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from 'redux/redux.types'

import { AuthLoginSuccessData, UserResponse } from './../Auth/Auth.types'
import Profile from './Profile'

const mapStateToProps = (state: RootState, props: any) => {
  return {
    ...props,
    user: state.auth.user,
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
