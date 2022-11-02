import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'
import { types as UserTypes } from '~/modules/User'

export interface FormFields {
  [UserTypes.UserFields.Firstname]: string
  [UserTypes.UserFields.Lastname]: string
  [UserTypes.UserFields.Email]: string | null
  [UserTypes.UserFields.Country]: string | null
  [UserTypes.UserFields.PhoneNumber]: string | null
  [UserTypes.UserFields.PhotoURL]: string | null
}

export type ProfileNavigation = NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Profile>
