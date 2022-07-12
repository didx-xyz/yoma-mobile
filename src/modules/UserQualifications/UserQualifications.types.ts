import { DocumentPickerResponse } from 'react-native-document-picker'

import { types as ApiTypes } from '~/api'
import { types as CvViewCredentialTypes } from '~/components/CvViewCredential'
import { NormalisedCvWidgetCredentialItems } from '~/components/CvWidgetCredential/CvWidgetCredential.types'
import { types as QualificationTypes } from '~/modules/Qualifications'
import { types as UserTypes } from '~/modules/User'
import { UserCredentialFormValues } from '~/modules/User/User.types'
import { NormalisedData } from '~/redux/redux.types'
import * as Types from '~/types/general.types'

import { types as UserQualificationFormTypes } from './Form'

export type NormalisedUserQualifications = NormalisedData<UserQualification>

export type UserQualificationsState = NormalisedUserQualifications & {
  formValues: UserCredentialFormValues | {}
}

export interface UserQualification extends UserTypes.UserCredentialMeta {
  qualification?: QualificationTypes.Qualification
}

export type CreateUserQualificationPayload = Types.Modify<
  UserQualificationFormTypes.FormFields,
  {
    startTime: string
    endTime: string
  }
>

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
