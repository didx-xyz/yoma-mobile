import { UserCredentialTypes } from '~/api/users/users.types'

import type { FormFields } from './EducationForm.types'

export const INITIAL_FORM_VALUES: FormFields = {
  title: '',
  type: UserCredentialTypes.Education,
  description: '',
  organisationId: '',
  startTime: null,
  endTime: null,
  countries: null,
  skillNames: [],
  certificate: null,
}
