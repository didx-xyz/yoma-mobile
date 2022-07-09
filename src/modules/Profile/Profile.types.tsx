import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FormikValues } from 'formik'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'

export interface ProfileFormState {
  values: FormikValues
  isValid: boolean
}

export interface ProfileFormUser {
  firstName: string
  lastName: string
  email: string | null
  countryAlpha2: string | null
  phoneNumber: string | null
  photoURL: string | null
}

export type ProfileNavigation = NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Profile>
