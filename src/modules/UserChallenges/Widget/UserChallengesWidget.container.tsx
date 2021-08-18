import React from 'react'
import { useSelector } from 'react-redux'

import UserChallengesWidget from './UserChallengesWidget'
import selector from './UserChallengesWidget.selector'

const UserChallengesWidgetContainer = () => {
  const { challenges } = useSelector(selector)
  return <UserChallengesWidget challenges={challenges} />
}

export default UserChallengesWidgetContainer
