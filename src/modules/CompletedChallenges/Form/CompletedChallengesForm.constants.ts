import { UserCredentialOpportunityTypes } from '~/api/users/users.types'

import { FormFields } from './CompletedChallengesForm.types'

export const INITIAL_FORM_VALUES: FormFields = {
  credentialItemId: '',
  type: UserCredentialOpportunityTypes.Challenge,
  startTime: null,
  endTime: null,
  requestVerification: false,
  certificate: null,
}
