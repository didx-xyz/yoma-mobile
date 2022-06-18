import { DocumentPickerResponse } from 'react-native-document-picker'

import { types as ApiTypes } from '~/api'
import { types as CvViewCredentialTypes } from '~/components/CvViewCredential'
import { NormalisedData } from '~/redux/redux.types'
import * as Types from '~/types/general.types'

import { types as EducationFormTypes } from '../Education/Form'
import { types as QualificationTypes } from '../Qualifications'
import { types as UserTypes } from '../User'
import { UserCredentialFormValues } from '../User/User.types'

export type NormalisedUserQualifications = NormalisedData<UserQualification>

export type UserQualificationsState = NormalisedUserQualifications & {
  formValues: UserCredentialFormValues | {}
}

export interface UserQualification extends UserTypes.UserCredentialMeta {
  qualification?: QualificationTypes.Qualification
}

export type CreateUserQualificationPayload = Types.Modify<
  EducationFormTypes.FormFields,
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
