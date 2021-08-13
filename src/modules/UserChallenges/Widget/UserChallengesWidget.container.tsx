import React from 'react'
import { useSelector } from 'react-redux'

import selector from '../UserChallenges.selector'
import UserChallengesWidget from './UserChallengesWidget'

const UserChallengesWidgetContainer = () => {
  const { challenges } = useSelector(selector)
  return <UserChallengesWidget challenges={challenges} />
}

export default UserChallengesWidgetContainer
