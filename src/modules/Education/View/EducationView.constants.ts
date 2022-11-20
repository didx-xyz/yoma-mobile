import { mergeRight, pipe } from 'ramda'

import { types as ApiUserTypes } from '~/api/users'
import { getUserCredentialViewSelectorSpec } from '~/modules/User/User.utils'
import { utils as UserEducationUtils } from '~/modules/UserEducation'

export const USER_EDUCATION_VIEW_SELECTOR_SPEC = pipe(
  getUserCredentialViewSelectorSpec,
  mergeRight({
    metadata: UserEducationUtils.getUserEducationMetadata,
  }),
)(ApiUserTypes.UserCredentialTypes.Education)
