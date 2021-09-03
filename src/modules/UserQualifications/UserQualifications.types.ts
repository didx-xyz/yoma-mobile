import { NormalisedData } from '../../redux/redux.types'
import { UserCredentialMeta } from '../User/User.types'

export interface Qualification {}

export interface UserQualification extends UserCredentialMeta {
  qualification: Qualification
}

export type NormalisedUserQualifications = NormalisedData<UserQualification>

export interface UserQualificationItem
  extends Pick<Qualification, 'organisationLogoURL' | 'name'>,
    Pick<UserCredentialMeta, 'startDate'> {
  isValidated: boolean
}

export type NormalisedUserQualificationItem = NormalisedData<UserQualificationItem>

export interface UserQualificationsState extends NormalisedUserQualifications {}

export type QualificationEntry = {
  challenge: string
  organisationLogoURL: string
  challengeHostProvider: string
  startDate: string
  endDate: string
  description: string
}

export type UserQualificationFormFields = {
  challenge: string
  challengeHostProvider: string
  description: string
  id: string
  startDate: Date | null
  endDate: Date | null
  skillNames: string[]
}
