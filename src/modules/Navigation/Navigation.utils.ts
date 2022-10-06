import { createNavigationContainerRef } from '@react-navigation/native'

import { LandingNavigationRoutes, ParamsList } from '~/modules/Landing/Landing.types'

import { HomeNavigationRoutes } from '../HomeNavigation/HomeNavigation.types'

export const navigationRef = createNavigationContainerRef<ParamsList>()

export const navigate = (name: LandingNavigationRoutes | HomeNavigationRoutes, params?: ParamsList | undefined) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}
