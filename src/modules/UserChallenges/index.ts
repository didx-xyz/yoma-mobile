import CompletedChallenges from '../CompletedChallenges/CompletedChallenges'
import UserChallengesWidget from '../CompletedChallenges/Widget'
import * as middleware from './UserChallenges.middleware'
import reducer, * as actions from './UserChallenges.reducer'
import * as types from './UserChallenges.types'

export { UserChallengesWidget, actions, reducer, middleware, types }
export default CompletedChallenges
