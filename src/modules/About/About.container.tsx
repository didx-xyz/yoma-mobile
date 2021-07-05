import selector from 'modules/About/About.selector'
import { UserCredentialsPayload } from 'modules/User/User.types'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import * as UserActions from '../User/User.reducer'
import About from './About'

const mapStateToProps = selector
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onUpdateUserCredentials: (biography: UserCredentialsPayload) => {
      dispatch(UserActions.updateUserCredentials(biography))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(About)
