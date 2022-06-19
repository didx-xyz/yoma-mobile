import { selectEducationCredentials } from '~/modules/Education/Education.selector'
import { selectUserQualificationCredentialsWidget } from '~/modules/UserQualifications/UserQualifications.selector'

export default selectUserQualificationCredentialsWidget(selectEducationCredentials)
