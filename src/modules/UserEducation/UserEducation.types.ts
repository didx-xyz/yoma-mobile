import { DocumentPickerResponse } from 'react-native-document-picker'

import { types as ApiTypes } from '~/api'
import { types as CvViewCredentialTypes } from '~/components/CvViewCredential'
import { NormalisedCvWidgetCredentialItems } from '~/components/CvWidgetCredential/CvWidgetCredential.types'
import { types as EducationTypes } from '~/modules/Education'
import { types as UserTypes } from '~/modules/User'
import { NormalisedData } from '~/redux/redux.types'

export type NormalisedUserEducation = NormalisedData<UserEducation>

export type UserEducationState = NormalisedUserEducation & {
  formValues: UserTypes.UserCredentialFormValues | {}
}
interface UserEducationOpportunityCredential extends EducationTypes.Education, UserTypes.OpportunityCredentialPartial {}

export interface UserEducation extends UserTypes.UserCredentialMeta {
  opportunity?: UserEducationOpportunityCredential
}

export type UserEducationViewCredentials = { userEducation: CvViewCredentialTypes.CvViewCredentialsData }

export interface CreateUserEducationCertificatePayload {
  id: string
  certificate: DocumentPickerResponse
}

export interface UserEducationResponse {
  data: UserEducation
}

export interface CreateUserEducationSuccessResponse {
  data: UserEducationResponse
  meta: ApiTypes.ApiResponseMeta
}

export interface UserEducationWidgetSelector {
  userEducation: NormalisedCvWidgetCredentialItems
  count: number
}
