import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'

export type CourseDetailsNavigation = NativeStackNavigationProp<
  HomeNavigatorParamsList,
  HomeNavigationRoutes.CourseDetails
>
