import { NormalisedData } from '../../redux/redux.types'
import * as Types from '../../types/general.types'
import { types as AuthTypes } from '../Auth'
import { types as EducationFormTypes } from '../Education/Form'
import { types as QualificationTypes } from '../Qualifications'
import { types as UserTypes } from '../User'

export type NormalisedUserQualifications = NormalisedData<UserQualification>

export type UserQualificationsState = NormalisedUserQualifications

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

export interface UserQualificationResponse {
  data: UserQualification
}

export interface CreateUserQualificationSuccessResponse {
  data: UserQualificationResponse
  meta: AuthTypes.ApiMetaResponse
}
