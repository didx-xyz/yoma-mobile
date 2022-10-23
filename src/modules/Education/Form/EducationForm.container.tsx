import React from 'react'
import { useTranslation } from 'react-i18next'

import { EducationNavigation } from '~/modules/Education/types'
import { UserEducationForm } from '~/modules/UserEducation'

interface Props {
  navigation: EducationNavigation
}
const EducationFormContainer = ({ navigation }: Props) => {
  const { t } = useTranslation()

  return <UserEducationForm navigation={navigation} title={t('Education')} />
}

export default EducationFormContainer
