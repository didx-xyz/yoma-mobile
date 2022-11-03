import { DocumentPickerResponse } from 'react-native-document-picker'

import { types as ApiTypes } from '~/api'
import { types as CvViewCredentialTypes } from '~/components/CvViewCredential'
import { NormalisedCvWidgetCredentialItems } from '~/components/CvWidgetCredential/CvWidgetCredential.types'
import { types as QualificationTypes } from '~/modules/Qualifications'
import { types as UserTypes } from '~/modules/User'
import { NormalisedData } from '~/redux/redux.types'

export type NormalisedUserQualifications = NormalisedData<UserQualification>

export type UserQualificationsState = NormalisedUserQualifications & {
  formValues: UserTypes.UserCredentialFormValues | {}
}
interface UserQualificationOpportunityCredential
  extends QualificationTypes.Qualification,
    UserTypes.OpportunityCredentialPartial {}

export interface UserQualification extends UserTypes.UserCredentialMeta {
  opportunity?: UserQualificationOpportunityCredential
}

export type UserQualificationsViewCredentials = { userQualifications: CvViewCredentialTypes.CvViewCredentialsData }

export interface CreateUserQualificationCertificatePayload {
  id: string
  certificate: DocumentPickerResponse
}

export interface UserQualificationResponse {
  data: UserQualification
}

export interface CreateUserQualificationSuccessResponse {
  data: UserQualificationResponse
  meta: ApiTypes.ApiResponseMeta
}

export interface UserQualificationsWidgetSelector {
  userQualifications: NormalisedCvWidgetCredentialItems
  count: number
}
