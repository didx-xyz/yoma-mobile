import { selectUserState } from 'modules/User/User.selector'
import { connect } from 'react-redux'
import { RootState } from 'redux/redux.types'

import Profile from './Profile'

const mapStateToProps = (state: RootState) => {
  return {
    user: selectUserState(state),
  }
}
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
