import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'

export type CompleteChallengesNavigation = NativeStackNavigationProp<
  HomeNavigatorParamsList,
  HomeNavigationRoutes.CompletedChallenges
>
