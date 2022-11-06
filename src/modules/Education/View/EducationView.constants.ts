import { mergeRight } from 'ramda'

import { constants as UserConstants } from '~/modules/User'
import { utils as UserEducationUtils } from '~/modules/UserEducation'

export const USER_EDUCATION_VIEW_SELECTOR_SPEC = mergeRight(UserConstants.USER_CREDENTIAL_VIEW_SELECTOR_SPEC, {
  metadata: UserEducationUtils.getUserEducationMetadata,
})
