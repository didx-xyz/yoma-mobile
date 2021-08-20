import { UserJobsFields } from './UserJobsForm.types'

export const INITIAL_VALUES: UserJobsFields = {
  title: '',
  description: '',
  id: '',
  startDate: null,
  endDate: null,
  country: '',
  skillNames: [],
  organisationId: '',
  organisationName: '',
  organisationWebsite: '',
  primaryContactName: '',
  primaryContactEmail: '',
  noResultInd: false,
  requestVerificationInd: false,
}
