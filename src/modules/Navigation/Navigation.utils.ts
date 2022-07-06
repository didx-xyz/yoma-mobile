import { createNavigationContainerRef } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export const navigate = (name: never, params: never) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}
