import React from 'react'
import { useTranslation } from 'react-i18next'

import { EducationNavigation } from '~/modules/Education/types'
import { UserQualificationsForm } from '~/modules/UserQualifications'

interface Props {
  navigation: EducationNavigation
}
const EducationFormContainer = ({ navigation }: Props) => {
  const { t } = useTranslation()

  return <UserQualificationsForm navigation={navigation} title={t('Education')} />
}

export default EducationFormContainer
