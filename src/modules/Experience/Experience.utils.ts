import api from 'api'
import { USER_ID } from 'helpers/helpers'

import { ExperienceFields } from './ExperienceForm/ExperienceForm.types'

export const getOrganizationsList = async () => {
  return await api.digitalCv.organisations.getKeyNames()
}

export const getSkillsList = async () => {
  return await api.digitalCv.skills.getKeyNames()
}

export const createJob = async (values: ExperienceFields, organisationId: string) => {
  const response = await api.digitalCv.workExperience.create({
    title: values.title,
    description: values.description,
    organisationId: organisationId,
    skillNames: values.skillNames,
  })
  return response.data
}

export const createCredential = async (job: any, values: ExperienceFields) => {
  const response = await api.users.credentials.create(USER_ID, {
    type: 'Job',
    credentialItemId: job.id,
    startTime: values.startDate,
    endTime: values.endDate,
    requestVerification: values.requestVerificationInd,
  })
  return response.data
}

export const submitForm = async (values: ExperienceFields) => {
  try {
    const job = await createJob(values, values.organisationId)
    await createCredential(job, values)
  } catch (err) {
    console.error(err)
  }
}
