import { FormikValues } from 'formik'
import { Skills } from 'modules/Skills/Skills.types'

export type QualificationResponsePayload = {
  skills: Skills
  id: string
  title: string
  description: string
  url: string
  createdAt: string
  zltoReward: number
  createdByAdmin: boolean
  language: string
  startTime: string
  endTime: string
  published: boolean
}

export type QualificationRequestPayload = {
  title: string
  description: string
  url: string
  organisationId: string
  zltoReward: number
  skillNames: Skills
  zltoRewardPool: number
  countries: string[]
  language: string
  startTime: string | null
  endTime: string | null
  published: boolean
}

export type ExperienceType = {
  endDate: string
  id: string
  job: Job
  startDate: string
}

type Job = {
  description: string
  id: string
  organisationId: string
  organisationLogoURL: string
  organisationName: string
  title: string
}
export type ExperienceFormState = {
  values: FormikValues
  isValid: boolean
}
