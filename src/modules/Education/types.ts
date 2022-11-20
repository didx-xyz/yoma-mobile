import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'
import { NormalisedData } from '~/redux/redux.types'

export type EducationNavigation = NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Education>

export interface Education {
  id: string
  title: string | null
  description: string | null
  instructions: string | null
  url: string | null
  createdAt: string
  zltoReward: number | null
  createdByAdmin: boolean
  language: string | null
  difficulty: string | null
  timeValue: number | null
  timePeriod: string | null
  startTime: string | null
  endTime: string | null
  published: boolean
  organisationId: string | null
  organisationName: string | null
  organisationLogoURL: string | null
  organisationURL: string | null
  organisationPrimaryContactName: string | null
  organisationPrimaryContactEmail: string | null
  organisationPrimaryContactPhone: string | null
  skills: string[] | null
  countries: string[] | null
  unverifiedCredentials: number | null
  approvedCredentials: number | null
  rejectedCredentials: number | null
  totalZLTORewarded: number | null
  skillsLearned: number | null
}

export type NormalisedEducation = NormalisedData<Education>

export type EducationState = NormalisedEducation
