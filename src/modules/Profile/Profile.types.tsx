import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'

export enum Fields {
  Firstname = 'firstName',
  Lastname = 'lastName',
  Email = 'email',
  Country = 'countryAlpha2',
  PhoneNumber = 'phoneNumber',
  PhotoURL = 'photoURL',
}

export interface FormFields {
  [Fields.Firstname]: string
  [Fields.Lastname]: string
  [Fields.Email]: string | null
  [Fields.Country]: string | null
  [Fields.PhoneNumber]: string | null
  [Fields.PhotoURL]: string | null
}

export type ProfileNavigation = NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Profile>
