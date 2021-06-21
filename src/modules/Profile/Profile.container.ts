import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import * as AppActions from './../App/App.reducer'
import Profile from './Profile'

const mapStateToProps = null
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogoutUser: () => {
      dispatch(AppActions.resetAppData())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile as any)
