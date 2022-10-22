import { DocumentPickerResponse } from 'react-native-document-picker'

import { UserCredentialOpportunityTypes } from '~/api/users/users.types'

export type FormFields = {
  title: string
  type: UserCredentialOpportunityTypes
  description: string
  organisationId: string
  countries: string[] | null
  startTime: string | Date | null
  endTime: string | Date | null
  skillNames: string[]
  certificate: DocumentPickerResponse | null
}
