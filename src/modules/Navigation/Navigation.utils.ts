import { createNavigationContainerRef } from '@react-navigation/native'

import { ParamsList } from './Navigation.types'

export const navigationRef = createNavigationContainerRef<ParamsList>()

export const navigate = (name: keyof ParamsList) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name)
  }
}
