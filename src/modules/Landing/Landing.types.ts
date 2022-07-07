import { HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'

export enum LandingNavigationRoutes {
  Authentication = 'Authentication',
}

export type LandingParamsList = {
  [LandingNavigationRoutes.Authentication]: undefined
}

export type ParamsList = LandingParamsList | HomeNavigatorParamsList
