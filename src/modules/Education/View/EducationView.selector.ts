import { selectEducationCredentials } from '~/modules/Education/Education.selector'
import { selectUserQualificationCredentialsView } from '~/modules/UserQualifications/UserQualifications.selector'

export default selectUserQualificationCredentialsView(selectEducationCredentials)
