import UserChallenges from './UserChallenges'
import * as middleware from './UserChallenges.middleware'
import reducer, * as actions from './UserChallenges.reducer'
import * as types from './UserChallenges.types'
import UserChallengesWidget from './UserChallenges.widget.container'

export { UserChallengesWidget, actions, reducer, middleware, types }
export default UserChallenges
