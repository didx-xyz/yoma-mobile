import React from 'react'
import { useTranslation } from 'react-i18next'

import { UserEducationForm } from '~/modules/UserEducation'

import { CompletedCoursesNavigation } from '../types'

interface Props {
  navigation: CompletedCoursesNavigation
}
const CompletedCoursesFormContainer = ({ navigation }: Props) => {
  const { t } = useTranslation()

  return <UserEducationForm navigation={navigation} title={t('Add course')} />
}

export default CompletedCoursesFormContainer
