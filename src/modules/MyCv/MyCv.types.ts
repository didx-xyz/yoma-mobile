import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'

export type MyCvNavigation = NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
