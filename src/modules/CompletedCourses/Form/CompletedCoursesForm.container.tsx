import React from 'react'
import { useTranslation } from 'react-i18next'

import { UserQualificationsForm } from '~/modules/UserQualifications'

import { CompletedCoursesNavigation } from '../types'

interface Props {
  navigation: CompletedCoursesNavigation
}
const CompletedCoursesFormContainer = ({ navigation }: Props) => {
  const { t } = useTranslation()

  return <UserQualificationsForm navigation={navigation} title={t('Add course')} />
}

export default CompletedCoursesFormContainer
