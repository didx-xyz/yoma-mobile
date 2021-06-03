import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { AuthLoginSuccessData } from './../Auth/Auth.types'
import Profile from './Profile'

interface AuthData {
  auth: { data: AuthLoginSuccessData }
}
const mapStateToProps = ({ auth }: AuthData, props: any) => {
  return {
    ...props,
    user: auth.data.user,
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
