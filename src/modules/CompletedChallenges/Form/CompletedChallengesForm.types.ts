import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { DocumentPickerResponse } from 'react-native-document-picker'

// import { UserCredentialOpportunityTypes } from '~/api/users/users.types'
import { types as HomeNavigationTypes } from '~/modules/HomeNavigation'

export type FormFields = {
  credentialItemId: string
  startTime: Date | null
  endTime: Date | null
  requestVerification: boolean
  certificate: DocumentPickerResponse | null
}

export type CompletedChallengesNavigation = NativeStackNavigationProp<
  HomeNavigationTypes.HomeNavigatorParamsList,
  HomeNavigationTypes.HomeNavigationRoutes.CompletedChallenges
>
