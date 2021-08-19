import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useSelector } from 'react-redux'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../modules/HomeNavigation/HomeNavigation.types'
import HomeHeader from './HomeHeader'
import selector from './HomeHeader.selector'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.DigitalCv>
}
const HomeHeaderContainer = ({ navigation }: Props) => {
  const { zltoBalance, profileImageUrl } = useSelector(selector)
  return <HomeHeader navigation={navigation} profileImageUrl={profileImageUrl} zltoBalance={zltoBalance} />
}

export default HomeHeaderContainer
