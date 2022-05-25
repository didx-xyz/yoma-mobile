import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'

export type MySkillsNavigation = NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MySkills>
