import { ApiResponseMeta } from '~/api/api.types'
import * as UserTypes from '~/modules/User/User.types'

export interface UserWorkExperience {
  organisationURL: string
  organisationPrimaryContactName: string
  organisationPrimaryContactEmail: string
  organisationPrimaryContactPhone: string
  organisationId: string
  organisationName: string
  organisationLogoURL: string | null
  id: string
  title: string
  description: string
  skills: string[]
  countries: string[]
  createdAt: string
  createdByAdmin: boolean
  language: string
  published: boolean
}

export interface UserWorkExperienceFormFields {
  title: string
  description: string
  skillNames: string[]
  organisationId: string
  startTime: string | null
  endTime: string | null
}

export interface UserWorkExperienceCredential extends UserTypes.UserCredentialMeta {
  workExperience: UserWorkExperience
}
export interface UserWorkExperienceResponse {
  data: { data: UserWorkExperienceCredential }
  meta: ApiResponseMeta
}

export interface NormalisedUserWorkExperience {
  ids: string[]
  entities: Record<string, UserWorkExperienceCredential>
}

export interface UserWorkExperienceState extends NormalisedUserWorkExperience {
  formValues: UserTypes.UserCredentialFormValues | {}
}
