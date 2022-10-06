import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'

import { HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import CourseDetials from './CourseDetails'

type Props = {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList>
}

const CourseDetailsContainer = ({ navigation }: Props) => {
  return <CourseDetials navigation={navigation} />
}

export default CourseDetailsContainer
