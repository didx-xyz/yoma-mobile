import { selectIsAuthorised } from 'modules/Auth/Auth.selector'
import { RootState } from 'redux/redux.types'

const selectIsAuthenticated = (state: RootState) => {
  return {
    isAuthenticated: selectIsAuthorised(state),
  }
}
export default selectIsAuthenticated
