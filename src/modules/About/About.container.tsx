import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { actions as UserActions } from '../User'
import About from './About'
import selector from './About.selector'

const mapStateToProps = selector
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onBiographySave: (biography: string) => {
      dispatch(UserActions.updateUser({ biography }))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(About)
