import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import UserJobsWidget from './UserJobsWidget'
import selector from './UserJobsWidget.selector'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.DigitalCv>
}

const UserJobsWidgetContainer = ({ navigation }: Props) => {
  const { userJobs } = useSelector(selector)
  return <UserJobsWidget userJobs={userJobs} navigation={navigation} />
}

export default UserJobsWidgetContainer
