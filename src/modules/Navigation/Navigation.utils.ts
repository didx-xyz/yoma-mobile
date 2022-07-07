import { createNavigationContainerRef } from '@react-navigation/native'

import { LandingParamsList } from '~/modules/Landing/Landing.types'

export const navigationRef = createNavigationContainerRef<LandingParamsList>()

export const navigate = (name: never, params: never) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}
